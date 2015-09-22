app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
    url: '/active/:alert',
    controller: 'ActiveController',
    templateUrl: 'js/profile/active.html',
  });
}).controller('ActiveController', function($scope, $state, ticketsSelling, ticketsBought, DS, events, user) {
  $scope.ticketsForSale = ticketsSelling
    .filter((ticket) => !ticket.expired() && !ticket.sold)
    .map((ticket) => {
      ticket.edit = false;
      return ticket;
    });

  $scope.ticketsBought = ticketsBought
    .filter((ticket) => !ticket.expired());

  $scope.isSeller = () => user.isSeller;

  $scope.removeTicket = (ticket) => {
		ticket.DSDestroy()
		.then(() => {
			alert('Ticket deleted!');
			$state.go('profile.active', {}, {reload: true});
		});
	};

  $scope.updatePrice = (ticket) => {
    ticket.DSUpdate({price: ticket.price})
    .then(() => {
      $state.go('profile.active', {'alert': 'sucess'}, {reload: true});
    })
    .then(null, (err) => {
      $state.go('profile.active', {'alert': 'error'}, {reload: true});
    });
  };
});
