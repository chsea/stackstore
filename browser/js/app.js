'use strict';
window.app = angular.module('FullstackGeneratedApp', ['ui.router', 'js-data', 'ui.bootstrap', 'fsaPreBuilt', 'ngMaterial']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });

    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };
    var destinationStateRequiresSeller = (state) => state.data && state.data.seller;
    var destinationStateRequiresAdmin = (state) => state.data && state.data.admin;

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState) &&
        !destinationStateRequiresSeller(toState) && !destinationStateRequiresAdmin(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated() &&
        !destinationStateRequiresSeller(toState) && !destinationStateRequiresAdmin(toState)) {
            return;
        }

        if (AuthService.isSeller() && !destinationStateRequiresAdmin(toState)) {
            return;
        }

        if (AuthService.isAdmin()) return;

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
              if ((!toState.data.admin && !toState.data.seller) || (!toState.data.admin && user.roles.indexOf('seller') > -1) || user.roles.indexOf('admin') > -1) {
                $state.go(toState.name, toParams);
              } else {
                $state.go('home');
              }
            } else {
                $state.go('login');
            }
        });

    });

});
