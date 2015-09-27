/**
 * A Food object is any purchasable item sold by the app.
 * <p>
 * Every Food MUST have an SKU identifier. Additionally, some Food 
 * such as produce may have a PLU number in addition to their SKU.
 * <p>
 * A Food may have either a unit price or a weight price. If the Food 
 * has a unit price, it will be charged the full unit price each time it is 
 * scanned. If a Food has a weight price, it's total price will depend 
 * on the weight of the item.
 * @returns {Food}
 */
function Food() {
    //Protected this scope
    var self = this;
    
    /**
     * Food SKU
     * @type String
     */
    this.sku = '';
    /**
     * Food PLU
     * @type Number
     */
    this.plu = -1;
    /**
     * Food name
     * @type String
     */
    this.name = '';
    /**
     * Food description
     * @type String
     */
    this.description = '';
    /**
     * Food unit price
     * @type Number
     */
    this.unitPrice = 0.00;    
    
    /**
     * Image URL for Food
     * @type String
     */
    this.imageUrl = '';
    
    /**
     * Retrieves a search result jQuery div for use in the food lookup 
     * page.
     * @returns {jQuery} search result div
     */
    this.getSearchResult = function() {
        var priceData = $('<div/>').addClass('price-data');
        priceData.append($('<span/>').addClass('currency').html(main.session.currency));
        if (self.unitPrice > 0) {
            priceData.append($('<span/>').addClass('price').html(self.unitPrice));
            priceData.append($('<span/>').addClass('per'));
            priceData.append($('<span/>').addClass('unit').html(' each'));
        }        
        else {
            priceData.append($('<span/>').addClass('price').html('Price Data Not Found'));
        }
        
        var div = $('<div/>').addClass('search-result');
        div.append($('<img/>').addClass('product-image').attr('src', self.imageUrl));
        div.append($('<div/>').addClass('product-data')
                .append($('<div/>').addClass('title')
                    .append($('<span/>').addClass('name').html(self.name))
                    .append($('<span/>').addClass('sku').html(self.sku)))
                .append($('<div/>').addClass('description').html(self.description))
                .append(priceData));
        
        return div;
    };
}