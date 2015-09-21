app.directive('user', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/user/user.html',
    scope: {
      user: '='
    },
    link: function(scope) {
      scope.user.sellerResponse = scope.user.isSeller ? 'Yes!' : 'Not yet.';
    }
  };
});
