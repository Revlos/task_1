//Define component:
angular.
  module("itemsAndComments").
    component("itemsAndComments", {
      templateUrl: "angular-js-part/items-and-comments/items-and-comments.template.html",
      controller: function ItemsAndCommentsController () {

        var self = this;

        self.test = "SOme text";
      }
    });