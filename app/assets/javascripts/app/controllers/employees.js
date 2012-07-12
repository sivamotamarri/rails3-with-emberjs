App.employeesController = Ember.ResourceController.create({
  resourceType: App.Employee,

  loadValuesUpto: function(json,num) {
    this.set('totalValues' , num);
    for (var i=0; i <  json.length; i++)
      this.load(json[i]);   
  }
});


