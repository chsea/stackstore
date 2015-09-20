app.config(function ($stateProvider) {
  $stateProvider.state('admin.tickets', {
    url: '/tickets',
    controller: 'AdminTicketsController',
    templateUrl: 'js/admin/tickets.html',
    resolve: {
      events: (Event) => Event.findAll(),
      tickets: (Ticket, events) => Ticket.findAll()
    }
  });
}).controller('AdminTicketsController', function($scope, $state, tickets, DS, events) {
  $scope.tickets = tickets;
  $scope.delete = (ticket) => {
		ticket.DSDestroy()
		.then(() => {
			alert('Ticket deleted!');
			$state.go('profile.tickets', {}, {reload: true});
		});
	};
});
