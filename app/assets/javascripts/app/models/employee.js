App.Employee  = Ember.Resource.extend({
  resourceUrl: '/employees',
  resourceName:       'employee',
  resourceProperties: ['first_name', 'last_name' , 'city' , 'age','education_level','university','work_experience','skills','current_step'],

  validate: function() {
    if (this.get('first_name') === undefined || this.get('first_name') === '' ||
        this.get('last_name') === undefined  || this.get('last_name') === '' ||
        this.get('city') === undefined  || this.get('city') === '' ||
        this.get('age') === undefined  || this.get('age') === '') {
      return 'Employee require a first, last name and city , age.';
    }
  },
  saveEmp: function(isMyNew) {
    var self = this;
    if (this.validate !== undefined) {
      var error = this.validate();
      if (error) {
        return {
          fail: function(f) { f(error); return this; },
          done: function() { return this; },
          always: function(f) { f(); return this; }
        };
      }
    }

    return this._resourceRequest({type: isMyNew ? 'PUT' : 'POST',
                                  data: this.serialize()})
      .done(function(json) {
        // Update properties
        if (json) self.deserialize(json);
      });
  },

  fullName: Ember.computed(function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }).property('first_name', 'last_name')
});

