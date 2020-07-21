function printReceipt(barcodes) {
    var items = decodeBarcodes(barcodes);
    var receipt = generateReceipt(getReceiptMessages(items));
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
    if(barcodes.length>0){
        return true;
    }else{
        return false;
    }
}

function getAllItems(barcodes){
    var data = [
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
    new_items.push(items[0]);
    new_items[0]['quantity']=1;
    var pushFlag;
    for(let i=1;i<items.length;i++){
        for(let j=0;j<new_items.length;j++){
            if(items[i].barcode==new_items[j].barcode){
                new_items[j].quantity++;
                pushFlag=false;
                break;
            }else{
                pushFlag=true;
            }
        }
        if(pushFlag){
            new_items.push(items[i]);
            new_items[new_items.length-1]['quantity']=1;
        }
    }
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
        receipt.push('Name: '+receiptMessages[i].name+', Quantity: '+receiptMessages[i].quantity+
            ', Unit price: '+receiptMessages[i].unitPrice+' (yuan), Subtotal: '+receiptMessages[i].subtotal+' (yuan)');    
    }
    receipt.push('----------------------');
    receipt.push(`Total: ${total} (yuan)`);
    receipt.push('**********************');
    return receipt.join('\n');
}

module.exports = {
    printReceipt
};