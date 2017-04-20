<!DOCTYPE html>
<html lang="en" ng-app="BnBApp">
<head>
  <meta charset="UTF-8">
  <title>Ai</title>
  <script src="/bower_components/angular/angular.js"></script>
  <script src="/bower_components/angular-foundation-6/dist/angular-foundation.min.js"></script>
  <script src="/bower_components/angular-touch/angular-touch.min.js"></script>
  <script src="/bower_components/ngmap/build/scripts/ng-map.js"></script>
  <script src="http://maps.google.com/maps/api/js?key=AIzaSyDRZRUMwKhEu0Nqru3N8pb9rximlgnup4A&libraries=geometry"></script>
  <script src="/app.js"></script>

  <link rel="stylesheet" href="/bower_components/foundation-sites/dist/css/foundation-flex.min.css" />
  <link rel="stylesheet" href="/app.css" />
</head>
<body>

<div class="container" ng-controller="GameController as ctrl">
  <div class="row">
    <div class="column large-3"
         ng-repeat="picture_url in ctrl.listing.picture_urls">
         <img ng-src="{{picture_url}}" />
      
    </div>
  </div>
  <div class="row">
    <div class="column large-6 validate-wrapper">
      <ng-map zoom="2">
      <a class="button validate-answer" 
          ng-click="ctrl.validateAnswer()"
      >Valider</a>
    </div>
  </div>
  <div class="row">
    <div class="column large-12">{{ctrl.chaleur}}</div>
  </div>

</div>
  
</body>
</html>