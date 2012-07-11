App.ListEmployeesView = Ember.View.extend({
  templateName:    'app/templates/employees/list',
  employeesBinding: 'App.employeesController',

 showNew: function() {
    this.set('isNewVisible', true);
  },

  hideNew: function() {
    this.set('isNewVisible', false);
  },

  refreshListing: function() {
    App.employeesController.findAll();
  }
});


