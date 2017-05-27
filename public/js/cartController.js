var app = angular.module("shoppingCart");
app.controller("cartController", function($scope, cartService) {
    // Start the form off empty on page load.
    $scope.formItem = {};
    var formItem=$scope.formItem;

    // formItem.total = (item.price*item.quantity);
    // Load the cart data on page load.
    cartService.getAllItems().then(function(items) {
        $scope.items = items;

    });

    // Function on scope called when form is submitted.
    $scope.addItem = function(item) {
      
$scope.total=(formItem.quantity*formItem.price);
        cartService.addItem(item).then(function() {

            // Clear the form.
            $scope.formItem = {};

            // Update the list with the new set of items.
            cartService.getAllItems().then(function(items) {
                $scope.items = items;
                console.log(items);
            });
        });
    };

    // Function on scope called when clicking Delete for an item.
    $scope.deleteItem = function(item) {
        cartService.deleteItem(item.id).then(function() {
            // Update the list with the new set of items.
            cartService.getAllItems().then(function(items) {
                $scope.items = items;
            });
        });
    };

});
