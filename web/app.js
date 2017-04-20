var app = angular.module("BnBApp", ["ngTouch", "mm.foundation", "ngMap"]);


app.controller('GameController', 
  ['$scope', '$http', 'NgMap', '$q', 
    function($scope, $http, $map, $q){
  
    var ctrl= this;
    ctrl.listing = null;
    ctrl.map     = null;
    ctrl.marker = null;
    
    // LOADING

    var promListing = $http.get("/data/listing.json");
    promListing.then(function(response){
      ctrl.listing = response.data.results[0].listing;

      console.log({"lat" : ctrl.listing.lat,
                   "lng" : ctrl.listing.lng,
                  })
    });

    var promMap = $map.getMap();
    promMap.then(function(map){
      ctrl.map = map;
      ctrl.marker = new google.maps.Marker();
      ctrl.marker.setMap(map);

      google.maps.event.addListener(map, "click", function(evt){
          ctrl.placeMarker(map, evt.latLng);
      });
    });

    $q.all([promListing, promMap])
      .then(function(){
                console.log("everything is loaded !");
        }, function(){
                console.error("OOPS !")
            });

    // HELPER FUNCTIONS

    ctrl.placeMarker = function(map, position){
      ctrl.marker.setPosition(position);
    }
}]);