app.directive('dateTimePicker', function () {

	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/date-time-picker/datetimepicker.html',
		controller: 'DateTimePickerCtrl',
		scope: {
			date: '='
		}
	};

}).controller('DateTimePickerCtrl', function ($scope) {

	// If it was not possible to parse the given date
	// which can be a ISO8601 formated string, a date Object, etc.
	// create a new date object with current time.
	var dateValue = Date.parse($scope.date);
	if (isNaN(dateValue)) {
		$scope.date = new Date();
		$scope.date.setHours(20);
		$scope.date.setMinutes(0);
	} else {
		$scope.date = new Date(dateValue);
	}

	$scope.getSetDate = function (newDate) {
		var hours, minutes;
		if (arguments.length) {
			hours = $scope.date.getHours();
			minutes = $scope.date.getMinutes();
			newDate.setHours(hours);
			newDate.setMinutes(minutes);
			$scope.date = newDate;
		} else {
			return $scope.date;
		}
	};

	$scope.getSetTime = function (minutes) {
		if (arguments.length) {
			minutes = Number(minutes);
			$scope.date.setHours(Math.floor(minutes / 60));
			$scope.date.setMinutes(minutes % 60);
		} else {
			return $scope.date.getHours() * 60 + $scope.date.getMinutes();
		}
	};

});