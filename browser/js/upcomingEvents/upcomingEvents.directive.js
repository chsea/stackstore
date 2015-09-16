app.directive('upcomingEvents', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'js/upcomingEvents/upcomingEvents.html',
        controller: 'UpcomingEventsCtrl'
    };
});
