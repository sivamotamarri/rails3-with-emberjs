App.NewEmployeeView = Ember.View.extend({
  tagName:      'form',
  templateName: 'app/templates/employees/new',
  emp: null,
  isSaveEmp: null,
  classNames: ['ember-view', 'my-other-class'],

  init: function() {
    this._super();
    this.set("employee", App.Employee.create());
    this.set('firstStepValue',true);
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    $.ajax({
    url: "/employees/new",
    dataType: 'json'
    } );

    this.firstStep();
    this.get("parentView").hideNew();
  },

  firstStep: function(){
    this.set('firstStepValue',true);
    this.set('secondStepValue',false);
    this.set('lastStepValue',false);
  },
  secondStep: function(){
    this.set('firstStepValue',false);
    this.set('secondStepValue',true);
    this.set('lastStepValue',false);
  },
 
  lastStep: function(){
    this.set('firstStepValue',false);
    this.set('secondStepValue',false);
    this.set('lastStepValue',true);
  },
  nextSubmit: function(){

    this.submit("next");
  },
  prevSubmit: function(){
    
    this.submit("prev");
  },


  submit: function(event) {
    var actionValue = event
    var self = this;
    var employee = this.get("employee");
   

    employee.saveEmp(self.get("isSaveEmp"),actionValue)
      .fail( function(e) {
        App.displayError(e);
      })
      .done(function() {
         if(self.get("firstStepValue") === true){
           self.set("emp",employee);
           self.secondStep();
           self.set("isSaveEmp",false);
         }
         else if (self.get("secondStepValue") === true){
            if(actionValue === "next"){
             self.set("emp", self.get("emp")+ employee);
             self.lastStep();
             self.set("isSaveEmp",false);
            }else{
              self.firstStep();
            }
         }
         else if(self.get("lastStepValue") === true){
          if(actionValue === "next"){
           self.set("emp", self.get("emp")+ employee);
           App.employeesController.set("totalValues",App.employeesController.get("totalValues")+1);
           self.get("parentView").hideNew();
           self.set("isSaveEmp",true);
           App.employeesController.pushObject(employee);
          }
          else{
               self.secondStep();
            }
         }       
      });


  }
});

