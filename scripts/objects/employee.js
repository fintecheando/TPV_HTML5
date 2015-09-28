/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Employee() {
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
     * Employee first name
     * @type String
     */
    this.nombretrab = '';
    /**
     * Employee Card 
     * @type String
     */
    this.tarjetaProximidad = '';
    
    
    /**
     * Retrieves a search result jQuery div for use in the food lookup 
     * page.
     * @returns {jQuery} search result div
     */
    this.getSearchResult = function() {
        var fs = require('fs');
        var SQL = require('sql.js');
        var filebuffer = fs.readFileSync('database/kiosk.db');

        // Load the db
        var db = new SQL.Database(filebuffer);

        // Prepare a statement
        var stmt = db.prepare("SELECT * FROM employee WHERE tarjetaProximidad = $card");
        stmt.getAsObject({$card:1}); // {col1:1, col2:111}

        // Bind new values
        stmt.bind({$card:1});
        while(stmt.step()) { //
            var row = stmt.getAsObject();
            // [...] do something with the row of result
        }
    };
}

