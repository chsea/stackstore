app.directive('event', function(Event) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/event/event.html',
    scope: {
      event: '='
    },
  };
});
