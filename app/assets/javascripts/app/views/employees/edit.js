App.EditEmployeeView = Ember.View.extend({
  tagName:      'form',
  templateName: 'app/templates/employees/edit',

  init: function() {
    this._super();

    // Create a new contact that's a duplicate of the contact in the parentView;
    // Changes made to the duplicate won't be applied to the original unless
    // everything goes well in submitForm()
    this.set("employee", this.get('parentView').get('employee').copy());
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    this.get("parentView").hideEdit();
  },

  submit: function(event) {
    var self = this;
    var employee = this.get("employee");

    event.preventDefault();

    employee.saveResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done( function() {
        var parentView = self.get("parentView");
        parentView.get("employee").duplicateProperties(employee);
        parentView.hideEdit();
      });
  }
});