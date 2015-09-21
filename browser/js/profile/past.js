app.config(function($stateProvider) {
  $stateProvider.state('profile.past', {
    url: '/past',
    controller: 'PastController',
    templateUrl: 'js/profile/past.html'
  });
}).controller('PastController', function($scope, ticketsBought, ticketsSelling, user) {
  $scope.ticketsSold = ticketsSelling
    .filter((ticket) => ticket.expired() && ticket.sold);
  $scope.ticketsUnSold = ticketsSelling
    .filter((ticket) => ticket.expired() && !ticket.sold);
  $scope.ticketsBought = ticketsBought
    .filter((ticket) => ticket.expired());
  $scope.isSeller = () => user.isSeller;
});
