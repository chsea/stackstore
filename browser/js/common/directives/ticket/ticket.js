app.directive('ticket', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/ticket/ticket.html',
    scope: {
      ticket: '='
    }
  };
});
