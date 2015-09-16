app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
      url: '/active',
      controller: 'ActiveController',
      templateUrl: 'js/user/active.html',
      resolve: {
        events: function(UserFactory) {
          return UserFactory.getEvents();
        }
      }
  });
}).controller('ActiveController', function($scope, events) {
  console.log(events);
});
