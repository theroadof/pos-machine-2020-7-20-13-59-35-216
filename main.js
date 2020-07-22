function printReceipt(barcodes) {
    const items = decodeBarcodes(barcodes);
    const receipt =(items===null)?null:generateReceipt(getReceiptMessages(items));
    console.log(receipt);
}

function decodeBarcodes(barcodes){
    if(isValidBarcode(barcodes)){
        return getAllItems(barcodes);
    }else{
        return null;
    }
}

function isValidBarcode(barcodes){
    const result = barcodes.length>0?true:false;
    return result;
}

function getAllItems(barcodes){
    const data = [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
    ];
    var items = [];
    for(let i=0;i<barcodes.length;i++){
        for(let j=0;j<data.length;j++){
            if(barcodes[i]===data[j].barcode){
                items.push(data[j]);
                break;
            }
        }
    } 
    return items;
}

function getReceiptMessages(items){
    var receiptMessages = countQuantity(items);
    for(let key in receiptMessages){
        receiptMessages[key]['unitPrice']=countUnitPrice(receiptMessages[key]);
        receiptMessages[key]['subtotal']=countSubtotal(receiptMessages[key].quantity,receiptMessages[key].price);
    }
    return receiptMessages;
}

function countQuantity(items){
    var new_items = [];
    var pushFlag=0;
    items.sort((a,b)=>{
        if(a.barcode>b.barcode){
            return 1;
        }else{
            return 0;
        }
    })
    for(let i=1;i<items.length;i++){
        if(items[i].barcode!==items[i-1].barcode){
            let item = items[i-1];
            item['quantity']=i-pushFlag;
            new_items.push(item);
            pushFlag=i;
        }
    }
    let item = items[items.length-1];
    item['quantity']=items.length-pushFlag;
    new_items.push(item);
    return new_items;
}

function countUnitPrice(item){
    return item.price;
}

function countSubtotal(quantity,unitPrice){
    return quantity*unitPrice;
}

function generateReceipt(receiptMessages){
    var receipt=[],total=0;
    receipt.push("\n***<store earning no money>Receipt ***");
    for(let i=0;i<receiptMessages.length;i++){
        total+=receiptMessages[i].subtotal;
        receipt.push(generateItemReceipt(receiptMessages[i]));
    }
    receipt.push('----------------------');
    receipt.push(`Total: ${total} (yuan)`);
    receipt.push('**********************');
    return receipt.join('\n');
}

function generateItemReceipt(receiptMessage){
    return ('Name: '+receiptMessage.name+', Quantity: '+receiptMessage.quantity+
            ', Unit price: '+receiptMessage.unitPrice+' (yuan), Subtotal: '+receiptMessage.subtotal+' (yuan)');
}

module.exports = {
    printReceipt
};