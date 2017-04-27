<!DOCTYPE html>
<html lang="en" ng-app="BnBApp">
<head>
  <meta charset="UTF-8">
  <title>Ai</title>
  <script src="/bower_components/angular/angular.js"></script>
  <script src="/bower_components/angular-foundation-6/dist/angular-foundation.min.js"></script>
  <script src="/bower_components/angular-touch/angular-touch.min.js"></script>
  <script src="/bower_components/angular-route/angular-route.min.js"></script>
  <script src="/bower_components/ngmap/build/scripts/ng-map.js"></script>
  <script src="http://maps.google.com/maps/api/js?key=AIzaSyDRZRUMwKhEu0Nqru3N8pb9rximlgnup4A&libraries=geometry"></script>
  <script src="/app.js"></script>

  <link rel="stylesheet" href="/bower_components/foundation-sites/dist/css/foundation-flex.min.css" />
  <link rel="stylesheet" href="/app.css" />
</head>
<body>

<div class="container">
  <div class="top-bar">
  <div class="top-bar-left">
    <ul class="menu">
      <li class="menu-text">Site Title</li>
      <li  class="active"><a href="#!/">Home</a></li>
      <li><a href="#!/game">Game</a></li>
      <li>Listing</li>
    </ul>
  </div>
</div>

  <div ng-view></div>
</div>
  
</body>
</html>