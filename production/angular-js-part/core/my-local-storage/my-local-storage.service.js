//Working with Local Storage:
angular.
  module("core.myLocalStorage").
    factory("MyLocalStorage", function() {

      //Reminder how to work with local storage:
      //- localStorage.setItem("items_arr", JSON.stringify([1,2,3]));
      //- JSON.parse(localStorage.getItem("items_arr"));
      //- localStorage.removeItem("items_arr");

      //Object to work with Local Storage:
      return {

      //Key to read and write items array:
      items_arr_key: "items_arr",

      //Read from local storage:
      read_some: function(key) {

        var result = localStorage.getItem(key);

        //First check if there anything on this key:
        if( result !== null && result !== undefined) {
          return result;
        } else {
          return false;
        }
      },

      //Load items array:
      //- Will return [] if there is nothing on the key.
      load_items_arr: function() {
        var result = this.read_some(this.items_arr_key);

        if(result !== false) {
          return JSON.parse(result);
        } else {
          return [];
        }
      },


      //Write:
      write_some: function(key, some) {

        var some_empty = false;

        //Chech if object is not empty:
        //!!! For now only for strings and arrays.
        if(typeof some === typeof [] || typeof some === typeof "") {
          if(some.length === 0) {
            some_empty = true;
          }
        }

        //If object is not empty:
        if(!some_empty) {
          localStorage.setItem(key, JSON.stringify(some));
        } else {
          //Else just remove item from Local Stogare:
          localStorage.removeItem(key);
        }
      },

      //Save items array:
      //- You need to pass array to save.
      //- Alwais will do real shallow copy.
      // !!! Add the check whether the array was passed.
      save_items_arr: function(items_array) {

        if(items_array.length === 0) {
          this.write_some(this.items_arr_key, []);
        } else {
          //Set all is_active properties to false:
          //- Will always work with "torn copy".
          var torn_copy = JSON.parse( JSON.stringify(items_array) );

          torn_copy.forEach(function(item) {
            item.is_active = false;
          });
          //

          //test:
          //console.log(torn_copy);

          this.write_some(this.items_arr_key, torn_copy);
        }
      }

      };//end: return {

    });