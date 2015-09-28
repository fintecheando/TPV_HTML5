/**
 * A ReceiptItem object loosely wraps a Product object.
 * <p>
 * In addition to the Product object, a ReceiptItem can record a weight 
 * for the Product. It also contains several helper functions to calculate 
 * prices.
 * @param {Product} product the Product to create this ReceiptItem from
 * @returns {ReceiptItem}
 */
function ReceiptItem(product, consecutive) {
    //Protect this scope
    var self = this;
    
    /**
     * The Product this ReceiptItem wraps
     * @type Product
     */
    this.product = product;

    /**
     * The consecutive of the product in the receipt
     * @type int
     */
    this.consecutive = consecutive;

    /**
     * The weight of the Product
     * @type Number
     */
    this.weight = 0;



    /**
     * Retrieves the price of the ReceiptItem, accounting for the current 
     * weight and the Product's weight price, if any. 
     * @returns {number} the price of the ReceiptItem
     */
    this.getPrice = function() {
        var total = 0;
        if (self.product.unitPrice > 0.00)  {
            total = self.product.unitPrice;
        }
        else if (self.product.weightPrice > 0.00) {
            total = self.product.weightPrice * self.weight;
        }        
        return total;
    };

    /**
     * Creates and returns a receipt item jQuery div selector for this
     * ReceiptItem.
     * @returns {jQuery} receipt item jQuery div selector
     */
    this.getReceiptItemDiv = function() {
        var productId = self.getReceiptItemId();

        var div = $('<div/>').attr('id', productId).addClass('receipt-item');
        var deleteIcon = $('<span/>').addClass('product-delete')
            .html('<img class="icon" src="images/cancel.png" width="25" height="25" />');

        deleteIcon.on("click",  function(){
            main.removeItemToReceipt(productId);
        });
        div.append(deleteIcon);


        div.append($('<span/>').addClass('product-name').html(self.product.name));

        var total = $('<span/>').addClass('product-total');
        if (self.weight > 0) {
            total.append($('<span/>').addClass('weight').html(self.weight + '' + self.product.weightUnit + ' '));
        }
        total.append($('<span/>').addClass('total').html(main.formatCurrency(self.getPrice())));
        div.append(total);


        return div;
    };

    this.getProductId = function () {
        return self.product.getCanonicalProductId();
    }

    /**
     * The Receipt Item Id to identify the element in the ticket items.
     */
    this.getReceiptItemId = function () {
        return self.product.getCanonicalProductId() + '-' + self.consecutive;
    }
}