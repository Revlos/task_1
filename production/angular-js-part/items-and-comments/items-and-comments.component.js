//Define component:
angular.
  module("itemsAndComments").
    component("itemsAndComments", {
      templateUrl: "angular-js-part/items-and-comments/items-and-comments.template.html",
      controller: ["$timeout", "$document", "MyLocalStorage", 
      function ItemsAndCommentsController ($timeout, $document, MyLocalStorage) {

        //test:
        //console.log(MyLocalStorage.read("items_arr", JSON.parse));

        var self = this;

        //For test purposes:
        self.test_mode = false;

        /*#################################################################*/
        /*Working with Local Storage: begin*/
        //!!! This must be removed later.

        //Object to work with Local Storage:
        self.my_local_storage = {};

        

        /*Working with Local Storage: end*/
        /*#################################################################*/


        /*#################################################################*/
        /*Items part: begin*/

        //Items object:
        self.items = {};

        //Key for data in the Local Storage:
        //self.items.LS_key = "items_arr";

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
        self.items.arr = MyLocalStorage.load_items_arr();

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

        //Adding new item thru pressing "Enter" on input field:
        self.new_item.input_key_down = function(event_obj) {
          if(event_obj.key === "Enter" && event_obj.ctrlKey === false) {
            self.new_item.add_new();
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
          },
          //new comment field dom element:
          new_comm_element: document.querySelector("#dy-main__comments__textarea")
        };

        //Object that contain all for creation of new item:
        self.new_comment = {};

        //Typed comment text:
        self.new_comment.comment_text = "";

        //Focus new-comment textarea on "Ctrl + Enter":
        
        $document.on("keydown", function(event) {

          //Check if some item is selected:
          if(self.comments_to_show.some_item_selected) {
            //Check if was pressed "Ctrl + Enter":
            if(event.ctrlKey && event.key === "Enter") {
              //Focus textarea for new comment:
              self.comments_to_show.new_comm_element.focus();
            }
          }

          //Tests:
          //console.log(event.key);

        });

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
              //!!! For now withoult this - because of how work "Focus new-comment field on "Ctrl + Enter":".
              //event_obj.target.blur();

              //Focus again to textarea to move with it with scroll:
              //!!! This is done thru some hack. Make later better.
              event_obj.target.blur();
              event_obj.target.focus();
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
            if(self.items.arr[item_index].is_active) {
              return "active_item";
            }
          }

          return "";
        };

        //Onclick handler for "Delete" button near the item:
        //This is the function to delete item by its index.
        self.items.delete_item = function(item_index, event) {

          //!!! Check this for safety.
          //In such way I removed redirect to "#" on click:
          event.preventDefault();
          
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

        //Save message:
        self.my_local_storage.save_msg = "Save";

        //Save all:
        self.my_local_storage.save_all = function(event) {

          //Save items:
          MyLocalStorage.save_items_arr(self.items.arr);

          //Blur save button:
          event.target.blur();

          //Show message that data was saved:
          self.my_local_storage.save_msg = "Data was Saved";

          //Restore normal message:
          $timeout(function() {
            self.my_local_storage.save_msg = "Save";
          }, 3000);
        };

        //Handling closing of the app:
        //Taken from: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
        // ! Apply license later.
        window.addEventListener("beforeunload", function (event) {

          //Check if present any changes in "data":
          //!!! Made this better.
          var data_from_local_storage = JSON.stringify(
            MyLocalStorage.load_items_arr()
          );
          /*Shallow copy of data from app, but with is_active=false:*/
          var data_present_in_app_shallow = JSON.parse(
            JSON.stringify(self.items.arr)
          );
          data_present_in_app_shallow.forEach(function(item) {
            item.is_active = false;
          });
          data_present_in_app_shallow = JSON.stringify(data_present_in_app_shallow);

          if(data_present_in_app_shallow !== data_from_local_storage) {
            var confirmationMessage = "There can be some changes, that will be not saved.";

            event.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;                  // Gecko, WebKit, Chrome <34
          }
          
        });

        /*Small Local Storage part: end*/
        /*######################*/
      }]
    });