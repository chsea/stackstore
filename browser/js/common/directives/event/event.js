app.directive('event', function(Event) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/event/event.html',
    scope: {
      event: '='
    },
    // link: function(scope) {
    //   scope.user.sellerResponse = scope.user.isSeller ? 'Yes!' : 'Not yet.';
    // }
  };
});
