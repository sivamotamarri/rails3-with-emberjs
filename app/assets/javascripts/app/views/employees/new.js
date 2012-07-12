App.NewEmployeeView = Ember.View.extend({
  tagName:      'form',
  templateName: 'app/templates/employees/edit',

  init: function() {
    this._super();
    this.set("employee", App.Employee.create());
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    this.get("parentView").hideNew();
  },

  submit: function(event) {
    var self = this;
    var employee = this.get("employee");

    event.preventDefault();

    employee.saveResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done(function() {
        App.employeesController.pushObject(employee);
        App.employeesController.set("totalValues",App.employeesController.get("totalValues")+1);
        self.get("parentView").hideNew();
      });
  }
});