App = Ember.Application.create();

App.displayError = function(e) {
  if (typeof e === 'string') {    
    alert(e);
  }
  else if (typeof e === 'object' && e.responseText !== undefined) {
    // TODO - further process json errors
    var obj = jQuery.parseJSON(e.responseText);
   
   arr = jQuery.map(obj, function (key, val) {
      return val  +" " + key;
    });

   
    alert(arr);

    //alert(e.responseText);
  }
  else {
    alert("An unexpected error occurred.");
  }
};

App.EducationLevels = Ember.A(['High-School / Secondary School' , 'Bachelors Degree','Masters Degree','PhD']);
App.WorkExperience = Ember.A(['0-1 Years' , '1-2 Years','2-5 Years','5-10 Years','10-15 Years','15+ Years']);




 
