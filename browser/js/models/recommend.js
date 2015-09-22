app.factory('Recommend', function(DS, $state) {
  return DS.defineResource({
    name: 'recommend'
  });
}).run(function(Recommend) {});
