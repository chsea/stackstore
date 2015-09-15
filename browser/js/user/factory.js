app.factory('UserFactory', function($http, AuthService) {
  function getEvents() {
    return AuthService.getLoggedInUser().then(function(user) {
      return user;
    });
  }

  return {
    getEvents: getEvents
  };
});
