var app = angular.module("BnBApp", ["ngTouch", "mm.foundation", "ngMap"]);


app.controller('GameController', 
  ['$scope', '$http', function($scope, $http){
  
    var ctrl= this;
    ctrl.listing = null;
    
    var prom = $http.get("/data/listing.json");
    prom.then(function(response){
      ctrl.listing = response.data.results[0].listing;
    })
}]);