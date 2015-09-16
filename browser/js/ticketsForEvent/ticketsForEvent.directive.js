app.directive('ticketsForEvent', function ($rootScope, $state) {

    return {
        restrict: 'E',
        // scope: {},
        templateUrl: 'js/ticketsForEvent/ticketsForEvent.html',
        controller: 'TicketsForEventCtrl'
    };

});
