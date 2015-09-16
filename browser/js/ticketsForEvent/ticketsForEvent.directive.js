app.directive('ticketsForEvent', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/ticketsForEvent/ticketsForEvent.html',
        controller: 'TicketsForEventCtrl'
    };

});
