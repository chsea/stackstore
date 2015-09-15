app.factory('UserFactory', function($http, AuthService) {
  function getEvents() {
    return AuthService.getLoggedInUser().then(function(user) {
      $http.get('/users/' + user._id).then(function(user) {
        
      });
    });
  }

  return {
    getEvents: getEvents
  };
});
