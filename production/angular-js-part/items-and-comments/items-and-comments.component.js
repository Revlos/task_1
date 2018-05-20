//Define component:
angular.
  module("itemsAndComments").
    component("itemsAndComments", {
      templateUrl: "angular-js-part/items-and-comments/items-and-comments.template.html",
      controller: function ItemsAndCommentsController () {

        var self = this;

        //For test purposes:
        self.test_mode = true;


        /*#################################################################*/
        /*Items part: begin*/

        //Items object:
        self.items = {};

        //Items array:
        self.items.arr = [];

        //For test:
        /**/
        self.items.arr = [
          {
            id: 10,
            name: "name 1",
            is_active: false
          },
          {
            id: 2,
            name: "name 2",
            is_active: false
          },
          {
            id: 3,
            name: "name 3",
            is_active: false
          }
        ];

        //Function to create unique id for the new item:
        //It will return id. Id is from [1,2,3,4,...].
        //!!! Improve this later.
        //!!! This code will work correctly, only when not empty array of items 
        //will consists of objects that have .id property. - improve this.
        self.items.create_id = function() {

          var new_id = 1;

          //If there is no elements in the items array, then new id = 1:
          if(self.items.arr.length === 0) {
            return 1;
          }

          //If items array is not empty then generate unique id:
          var temp_arr = self.items.arr.slice();
          var id_found = true;

          while(id_found === true) {

            //Assume that there no such id:
            id_found = false;

            //Check:
            temp_arr.forEach(function(item, index) {

              if(item.id === new_id) {
                new_id++;

                id_found = true;
              }
            });
          }

          return new_id;
        };

        

        //Object for "new" field:----------------------------------------
        self.new_item = {};

        /*Example of object for one item:
        {
          id: 1,
          name: "name 1",
          is_active: false
        }
        */

        //Pseudo constructor for object of one item:
        self.new_item.OneItem = function () {

          var obj = {};

          //Setting some initial values:
          obj.id = 0;
          obj.name = "name";
          obj.is_active = false;

          return obj;
        }

        //Typed name:
        self.new_item.name = "";

        //Validation for typed name:
        //If it is valid - return true, not valid - false.
        self.new_item.validate = function() {

          //Initial value is "true", but if any of the 
          // below tests will fail than will be "false".
          var valid = true;

          //Check if model part is not empty:
          if( self.new_item.name === undefined || 
              self.new_item.name === null ) {
            
            valid = false;

          } else {

            //Check if not entered an empty string:
            //!!! For now this will be done by cheking the length of the getted string. - 
            // - this must be improwed.
            if( self.new_item.name.length === 0) {
          
            valid = false;
            }
          }

          //For tests:
          /*
          if(valid) {
            console.log("New item name is valid!");
          } else {
            console.log("New item name is not valid!");
          }
          */

          //Return validity value:
          return valid;

        };

        //Onclick handler for "Add new" button:
        self.new_item.add_new = function () {

          //For tests:
          //console.dir(self.new_item);

          //Validate:
          if(self.new_item.validate()) {
            //Do if new item name is valid:

            //Create new item object;
            var new_item = self.new_item.OneItem();

            //For tests:
            //console.dir(new_item);

            //Setting the properties:
            new_item.name = self.new_item.name;
            new_item.is_active = false;
            new_item.id = self.items.create_id();

            //Add new item to items array:
            self.items.arr.push(new_item);

          } else {
            //If not valid:

          }
        };
        //end: Object for "new" field:------------------------------------

        //Onclick handler for "Delete" button near the item:
        //This is the function to delete item by its index.
        self.items.delete_item = function(item_index) {
          
          //For tests:
          //console.log(item_index);

          self.items.arr.splice(item_index, 1);
        };

        
        /*Items part: end*/
        /*#################################################################*/
      }
    });