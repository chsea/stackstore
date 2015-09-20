app.directive('venue', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/venue/venue.html',
    scope: {
      venue: '='
    },
  };
});
