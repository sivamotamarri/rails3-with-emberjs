App.Employee  = Ember.Resource.extend({
  resourceUrl: '/employees',
  resourceName:       'employee',
  resourceProperties: ['first_name', 'last_name' , 'city' , 'age'],

  validate: function() {
    if (this.get('first_name') === undefined || this.get('first_name') === '' ||
        this.get('last_name') === undefined  || this.get('last_name') === '' ||
        this.get('city') === undefined  || this.get('city') === '' ||
        this.get('age') === undefined  || this.get('age') === '') {
      return 'Employee require a first, last name and city , age.';
    }
  },

  fullName: Ember.computed(function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }).property('first_name', 'last_name')
});

