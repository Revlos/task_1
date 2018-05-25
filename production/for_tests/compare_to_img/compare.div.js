$(document).ready(function() {

  var show_div = $("#test_compare_div");

  //console.log(show_div.get(0));

  $(document).on("keydown", function(event) {

          //Controll test_compare_div:
          //!!! Later this need to be commented.
          if(event.key === "s") {
            //Toggle showing of the compare_div:
            show_div.toggleClass("up_div");
          } else if (event.key === "c") {
            //Toggle showing of the compare_div with opacity:
            show_div.toggleClass("overlay_div");
          }

  });
});