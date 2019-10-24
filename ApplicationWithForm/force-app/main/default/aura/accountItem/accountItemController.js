({
    doInit : function(component, event, helper) { 
        var idOfAccount = component.get("v.account.Id");
        var action = component.get("c.getContacts");
        action.setParams({
        	"myAccountId": idOfAccount,
    	});
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contacts", response.getReturnValue());
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    
    handleSelect: function(component, event, helper) {
        var menuValue = event.detail.menuItem.get("v.value");
        switch(menuValue) {
            case "1": helper.doEdit(component, event); break;
            case "2": helper.doDelete(component, event); break;
        }
    },
    
    newContact: function(component, event, helper) {
        var idOfAccount = component.get("v.account.Id");
    	var createRecordEvent = $A.get("e.force:createRecord");
    	createRecordEvent.setParams({
        	"entityApiName": "Contact",
            "defaultFieldValues": {
        			'AccountId' : idOfAccount
    		}
    	});

    	createRecordEvent.fire();  
    }
})