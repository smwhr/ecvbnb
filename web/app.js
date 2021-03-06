var app = angular.module("BnBApp", ["ngTouch", "mm.foundation", "ngMap","ngRoute"]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/', {
        templateUrl: 'templates/index.html',
        controller: "FrontController",
        controllerAs: 'ctrl',
        activetab: 'home',
    }).
    when('/game', {
        templateUrl: 'templates/game.html',
        controller: "GameController",
        controllerAs: 'ctrl',
        activetab: 'game',
    }).
    when('/listing/:id', {
        templateUrl: 'templates/single.html',
        controller: "SingleController",
        controllerAs: 'ctrl',
        activetab: 'listing'
    })
}]);

app.run(['$rootScope', '$route', function($rootScope, $route) {
  $rootScope.$route = $route;
  $rootScope.$on('$routeChangeSuccess', function() {
    // analytics
    ga('send', 'pageview');
  });
}]);

app.controller('FrontController', 
  ['$scope', '$http', 
    function($scope, $http){
}]);

app.controller('SingleController', 
  ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
      var ctrl= this;

      ctrl.listing_index = $routeParams.id;
      ctrl.listing = null;

      var promListing = $http.get("/data/search_results.json");
      promListing.then(function(response){
          ctrl.listing = response.data.search_results[ctrl.listing_index].listing;
      });

      ctrl.doSomething = function(data){
        alert(data);
      }
}]);

app.controller('GameController', 
  ['$scope', '$http', 'NgMap', '$q', 
    function($scope, $http, $map, $q){

    var ctrl= this;
    ctrl.listings= null;
    ctrl.listing = null;
    ctrl.listing_index = null;
    ctrl.map     = null;
    ctrl.marker = null;

    ctrl.guess = null;

    ctrl.last_dist = Infinity;
    ctrl.chaleur = "Rapproche toi !";
    
    // LOADING

    var promListing = $http.get("/data/search_results.json");
    promListing.then(function(response){
      ctrl.listings = response.data.search_results;
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
                ctrl.randomListing()
        }, function(){
                console.error("OOPS !")
            });

    // HELPER FUNCTIONS

    ctrl.placeMarker = function(map, position){
      ctrl.marker.setPosition(position);
      ctrl.guess = position;
    }

    // GAME FUNCTION

    ctrl.randomListing = function(){
      var rand = Math.floor(Math.random()*ctrl.listings.length)
      ctrl.listing_index  = rand;
      ctrl.listing = ctrl.listings[rand].listing;
    }

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
      if(dist < 5){
        alert("gagné !"); return;
      }
      if (dist > ctrl.last_dist){
        ctrl.chaleur = "Froid";
      }else{
        ctrl.chaleur = "Chaud";
      }
      ctrl.chaleur += " ("+dist.toFixed(2)+")"
      ctrl.last_dist = dist;
    }
}]);


app.directive('landlord', ['$http', function($http){
  return {
    restrict: 'EA',
    scope:{
      listing:'=listing',
      onClick: '&handler'
    },
    templateUrl: 'templates/landlord.html',
    link: function($scope, element, attrs){
        $scope.showId = function(data){
          $scope.onClick(data);
        }

        $scope.$watch("listing",function(newValue,oldValue) {
          if(newValue === null) return;
          $scope.landlord = {
            'name' : $scope.listing.primary_host.first_name,
            'picture': $scope.listing.primary_host.picture_url,
            'id': $scope.listing.primary_host.id
          } 
        });
    }
  }
}]);