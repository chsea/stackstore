app.directive('event', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/event/event.html',
    scope: {
      event: '='
    },
  };
});
