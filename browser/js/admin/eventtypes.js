app.config(function($stateProvider) {
  $stateProvider.state('admin.eventTypes', {
    url: '/eventtypes',
    controller: 'AdminEventTypesController',
    templateUrl: 'js/admin/eventTypes.html',
    resolve: {
      eventTypes: (EventType) => EventType.findAll()
    }
  });
}).controller('AdminEventTypesController', function($scope, $state, DS, eventTypes, EventType) {
  $scope.eventTypes = eventTypes.map((eventType) => {
    eventType.edit = false;
    return eventType;
  });
  $scope.newEventType = {};

  $scope.update = (eventType) => {
    eventType.DSUpdate(eventType)
      .then(() => {
        alert('Updated!');
        $state.go('admin.eventTypes', {}, {reload: true});
      });
  };

  $scope.add = () => {
    EventType.create($scope.newEventType)
      .then((eventType) => {
        alert(`${eventType.name} created!`);
        $state.go('admin.eventTypes', {}, {reload: true});
      });
  };
});
