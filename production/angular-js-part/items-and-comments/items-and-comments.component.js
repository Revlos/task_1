//Define component:
angular.
  module("itemsAndComments").
    component("itemsAndComments", {
      templateUrl: "angular-js-part/items-and-comments/items-and-comments.template.html",
      controller: function ItemsAndCommentsController () {

        var self = this;

        //For test purposes:
        self.test_mode = false;

        /*#################################################################*/
        /*Working with Local Storage: begin*/

        //Object to work with Local Storage:
        self.my_local_storage = {};

        //Get items array from local storage:
        //-It will return such array.
        self.my_local_storage.get_items_array = function() {
          //First check if there anything on this key:
          if( localStorage.getItem("items_arr") !== null &&
              localStorage.getItem("items_arr") !== undefined) {
            return JSON.parse(localStorage.getItem("items_arr"));
          } else {
            return [];
          }
        };

        //Test:
        //console.log(self.my_local_storage.get_items_array());

        //Save items array in the local storage:
        //- You need to pass array to save.
        //- ! Shallow copy somehow not shallow.
        self.my_local_storage.save_items_array = function(array) {

          var shallow_array = array.slice();
          
          //If array is not empty:
          if(shallow_array.length !== 0) {

            //Make all items not active:
            //!!! Somehow this is not shallow copy - there problems with this.
            /*
            shallow_array.forEach(function(item) {
              item.is_active = false;
            });
            */

            localStorage.setItem("items_arr", JSON.stringify(shallow_array));
          } else {
            //Else just remove item from Local Stogare:
            localStorage.removeItem("items_arr");
          }
        };

        //Reminder how to work with local storage:
        //- localStorage.setItem("items_arr", JSON.stringify([1,2,3]));
        //- JSON.parse(localStorage.getItem("items_arr"));
        //- localStorage.removeItem("items_arr");

        /*Working with Local Storage: end*/
        /*#################################################################*/


        /*#################################################################*/
        /*Items part: begin*/

        //Items object:
        self.items = {};

        //Items array:
        self.items.arr = [];
        /*Will be something similar to this:
        [
          {
            id: 10,
            name: "name 1",
            is_active: false,
            comments_arr: ["one", "two"]
          },
          {
            id: 2,
            name: "name 2",
            is_active: false,
            comments_arr: ["one", "two"]
          },
        ]
        */

        //Made initial reading of the items array:
        // ! If there is no data in Local Storage, the will be present empty array.
        self.items.arr = self.my_local_storage.get_items_array();

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

        //Pseudo constructor for object of one item:
        self.new_item.OneItem = function () {

          var obj = {};

          //Setting some initial values:
          obj.id = 0;
          obj.name = "name";
          obj.is_active = false;
          obj.comments_arr = [];

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
        
        /*Items part: end*/
        /*#################################################################*/

        /*#################################################################*/
        /*Comments part: end*/

        //Object that will contain all for comments of selected item:
        self.comments_to_show = {
          //Index of selected item:
          //When no item is selected will be 0.
          item_index: 0,
          //Is some item selected?
          some_item_selected: false,
          //Show or not - comments and new comment field:
          show: function() {
            //Show only when some item is selected and only when items array is not empty:
            if(this.some_item_selected && self.items.arr.length !== 0) {
              return true;
            } else {
              return false;
            }
          }
        };

        //Object that contain all for creation of new item:
        self.new_comment = {};

        //Typed comment text:
        self.new_comment.comment_text = "";

        //Literally keydown event handler for new-comment field:
        self.new_comment.key_down = function(event_obj) {

          //If no item is selected do nothing; Also do nothing if entered only white space:
          if(self.comments_to_show.some_item_selected && self.new_comment.comment_text.length !== 0) {

            //For tests:
            //console.dir(event_obj);

            //Checking if was pressed "Ctrl + Enter".
            //If was pressed do what below, else do nothing.
            if(event_obj.ctrlKey && event_obj.key === "Enter") {

              //Adding new comment:
              self.items.arr[self.comments_to_show.item_index].
                comments_arr.push(self.new_comment.comment_text);

              //Blur text field to remove problems with auto-repeat keys:
              event_obj.target.blur();
            }

          }
        };

        /*######################*/
        /*Small items part: begin*/

        //Function that fires when item is clicked:
        self.items.item_click = function (item_index, event) {

          //Prevente default:
          event.preventDefault();

          //Set all items not active:
          self.items.arr.forEach(function(item, index) {
            item.is_active = false;
          });

          //Set clicked item active:
          self.items.arr[item_index].is_active = true;

          //Set that some item was selected:
          self.comments_to_show.some_item_selected = true;

          //Set index of item that was chosen to show comments of it:
          self.comments_to_show.item_index = item_index;

          //For checking:
          //console.log(event.isDefaultPrevented());
        };

        //Function to calculate class of the items:
        self.items.class_to_set = function(item_index) {

          //Check if there are items in items array:
          if(self.items.arr.length !== 0) {
            if(self.items.arr[item_index].is_active && 
              //!!! Below is that what is needed to consider problems with shallow copying 
              //and that for now also save is_active value.
              self.comments_to_show.some_item_selected === true) {
              return "active_item";
            }
          }

          return "";
        };

        //Onclick handler for "Delete" button near the item:
        //This is the function to delete item by its index.
        self.items.delete_item = function(item_index, event) {
          
          //For tests:
          //console.log(item_index);


          //Consider that how deleting will affect active item 
          //and display of the comments:
          //First if some item is selected. What we do we need to do only when some item is selected.
          if (self.comments_to_show.some_item_selected) {
            //If deleted item goes after selected item, we do nothing:
            if(item_index <= self.comments_to_show.item_index) {
              //If deleted item index = selected item:
              if(item_index === self.comments_to_show.item_index) {
                //Set that no item is selected:
                self.comments_to_show.some_item_selected = false;
              }

              //If deleted item index < selected item:
              if(item_index < self.comments_to_show.item_index) {
                //Correct index of selected item:
                self.comments_to_show.item_index--;
              } 
            }
          }

          self.items.arr.splice(item_index, 1);

          //For test:
          //console.log(event);

          //Stop propagation to items box:
          event.stopImmediatePropagation();
        };//end: self.items.delete_item = function(item_index, event) {

        /*Small items part: end*/
        /*######################*/

        /*Comments part: end*/
        /*#################################################################*/

        /*######################*/
        /*Small Local Storage part: begin*/

        //Save all:
        self.my_local_storage.save_all = function() {

          //Save items:
          self.my_local_storage.save_items_array(self.items.arr);
        };

        /*Small Local Storage part: end*/
        /*######################*/
      }
    });