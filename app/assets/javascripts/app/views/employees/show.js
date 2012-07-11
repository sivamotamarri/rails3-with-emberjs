App.ShowEmployeeView = Ember.View.extend({
  templateName: 'app/templates/employees/show',
  classNames:   ['show-employee'],
  tagName:      'tr',

  doubleClick: function() {
    this.showEdit();
  },

  showEdit: function() {
    this.set('isEditing', true);
  },

  hideEdit: function() {
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    var employee = this.get("employee");

    employee.destroyResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done(function() {
        App.employeesController.removeObject(employee);
      });
  }
});

