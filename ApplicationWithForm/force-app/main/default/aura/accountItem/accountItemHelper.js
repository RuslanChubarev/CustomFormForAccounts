({
    doDelete : function(component, event, helper) {
		console.log('Delete record');
        
        //getting the transaction information
        var mainAccount = component.get("v.account");
        
        
        //Calling the Apex Function
        var action = component.get("c.deleteAccount");
        
        //Setting the Apex Parameter
        action.setParams({
            "myAccount" : mainAccount
        });
        
        //Setting the Callback
        action.setCallback(this,function(a){
            //get the response state
            var state = a.getState();
            
            //check if result is successfull
            if(state == "SUCCESS"){
                component.find('notifaboutdelete').showNotice({
            	"variant": "info",
            	"header": "Success!",
            	"message": "Record successfully deleted .",
                closeCallback: function() {
					$A.get('e.force:refreshView').fire();            	
                }
       			});
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        
		//adds the server-side action to the queue        
        $A.enqueueAction(action);
    },
    
    doEdit : function(component, event, helper) {
    var editRecordEvent = $A.get("e.force:editRecord");
        
    editRecordEvent.setParams({
         "recordId": component.get("v.account.Id")
   	});
    editRecordEvent.fire();
    },
    
})