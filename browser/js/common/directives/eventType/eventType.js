app.directive('eventType', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/eventType/eventType.html',
    scope: {
      eventtype: '='
    },
  };
});
