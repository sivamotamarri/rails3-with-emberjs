App.ListEmployeesView = Ember.View.extend({
    templateName:    'app/templates/employees/list',
    employeesBinding: 'App.employeesController',
    page: 1,

    nextPage: function(){
       
        var self = App.employeesController;
        var actual = App.employeesController;
        
        if(this.get('page') < Math.ceil(self.get('totalValues')/3)){           
            this.set('page' ,this.get('page')+1 )
            return actual._resourceRequest({
                type: 'GET',
                data: 'page='+this.get('page')
                })
            .done(function(json) {               
                self.clearAll();
                self.loadAll(json);                
            });
        }  

    },
    prevPage: function() {
        var self = App.employeesController;
        var actual = App.employeesController;
        if(this.get('page') === 1){
            this.set('page' , 1)
        }
        else{
            this.set('page' ,this.get('page') - 1 )
            return actual._resourceRequest({
                type: 'GET',
                data: 'page='+this.get('page')
                })
            .done(function(json) {
                self.clearAll();
                self.loadAll(json);
            });
        }

    },

    showNew: function() {
         $.ajax({
            url: "/employees/new",
            dataType: 'json'
            } );

        this.set('isNewVisible', true);
    },

    hideNew: function() {
        this.set('isNewVisible', false);
    },

    refreshListing: function() {
        App.employeesController.findAll();
    }
});


