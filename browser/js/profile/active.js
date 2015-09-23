app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
    url: '/active/:alert',
    controller: 'ActiveController',
    templateUrl: 'js/profile/active.html',
  });
}).controller('ActiveController', function($scope, $state, $stateParams, ticketsSelling, ticketsBought, DS, events, user) {
  $scope.success = $stateParams.alert == 'success';
  $scope.err = $stateParams.alert == 'err';
  $scope.delete = $stateParams.alert == 'delete';
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
			$state.go('profile.active', {'alert': 'delete'}, {reload: true});
		})
    .then(null, (err) => {
      $state.go('profile.active', {'alert': 'err'}, {reload: true});
    });
	};

  $scope.updatePrice = (ticket) => {
    ticket.DSUpdate({price: ticket.price})
    .then(() => {
      $state.go('profile.active', {'alert': 'success'}, {reload: true});
    })
    .then(null, (err) => {
      $state.go('profile.active', {'alert': 'err'}, {reload: true});
    });
  };
});
