var app = angular.module("BnBApp", ["ngTouch", "mm.foundation", "ngMap"]);


app.controller('GameController', 
  ['$scope', '$http', 'NgMap', '$q', 
    function($scope, $http, $map, $q){
  
    var ctrl= this;
    ctrl.listing = null;
    ctrl.map     = null;
    ctrl.marker = null;

    ctrl.guess = null;

    ctrl.last_dist = Infinity;
    ctrl.chaleur = "Rapproche toi !";
    
    // LOADING

    var promListing = $http.get("/data/listing.json");
    promListing.then(function(response){
      ctrl.listing = response.data.results[0].listing;
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
      ctrl.guess = position;
    }

    // GAME FUNCTION

    ctrl.validateAnswer = function(){
      var listing_position = new google.maps.LatLng(
                  {"lat" : ctrl.listing.lat,
                   "lng" : ctrl.listing.lng,
                  });
      var dist = google.maps
                       .geometry
                       .spherical
                       .computeDistanceBetween(
                          ctrl.guess,
                          listing_position
                        )/1000;
      if (dist > ctrl.last_dist){
        ctrl.chaleur = "Froid";
      }else{
        ctrl.chaleur = "Chaud";
      }
      ctrl.chaleur += " ("+dist.toFixed(2)+")"
      ctrl.last_dist = dist;
    }
}]);