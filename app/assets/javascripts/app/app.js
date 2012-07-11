App = Ember.Application.create();

App.displayError = function(e) {
  if (typeof e === 'string') {    
    alert(e);
  }
  else if (typeof e === 'object' && e.responseText !== undefined) {
    // TODO - further process json errors
    var obj = jQuery.parseJSON(e.responseText);
    alert("age " + obj.age);
   // alert(e.responseText);
  }
  else {
    alert("An unexpected error occurred.");
  }
};
