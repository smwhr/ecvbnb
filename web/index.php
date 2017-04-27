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
      <li class="menu-text">ECVBnBGame</li>
      <li  ng-class="{active : $route.current.activetab == 'home'}"><a href="#!/">Home</a></li>
      <li  ng-class="{active : $route.current.activetab == 'game'}"><a href="#!/game">Game</a></li>
      <li  ng-class="{active : $route.current.activetab == 'listing'}"><a>Listing</a></li>
    </ul>
  </div>
</div>

  <div ng-view></div>
</div>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-1111111','auto');
</script>
  
</body>
</html>