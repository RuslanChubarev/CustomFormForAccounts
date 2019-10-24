({
    doInit : function(component, event, helper) { 
    	helper.getRatingPicklist(component, event);
        helper.getOwnershipPicklist(component, event);
        helper.getTypePicklist(component, event);
        var action = component.get("c.getAccounts");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },

    handleRatingOnChange : function(component, event, helper) {
        var rating = component.get("v.newAccount.Rating");
    },
    
    handleOwnershipOnChange : function(component, event, helper) {
        var ownership = component.get("v.newAccount.Ownership");
    },
    
    handleTypeOnChange : function(component, event, helper) {
        var ownership = component.get("v.newAccount.Type");
    },
    
    clickCreate : function(component, event, helper) {
		console.log('Create record');
        
        //get name of account
		var inputName = component.find("accountname");
        var valueOfName = inputName.get("v.value");
		
        //get number of account
        var inputNumber = component.find("accountnumber");
        var valueOfNumber = inputNumber.get("v.value");
        
		//get site of account
        var inputSite = component.find("accountsite");
        var valueOfSite = inputSite.get("v.value");

        //get phone number of account
        var inputPhoneNumber = component.find("phonenumber");
        var valueOfPhoneNumber = inputPhoneNumber.get("v.value");

        //get phone number of account
        var inputAnnualRevenue = component.find("accountannualrevenue");
        var valueOfAnnualRevenue = inputAnnualRevenue.get("v.value");

        //get fax of account
        var inputFax = component.find("fax");
        var valueOfFax = inputFax.get("v.value");
        
        //getting the account information
        var mainAccount = component.get("v.newAccount");
      
        //Calling the Apex Function
        var action = component.get("c.saveAccount");
      
        //Setting the Apex Parameter
        action.setParams({
            "myAccount" : mainAccount
        });
        
        //Setting the Callback
        action.setCallback(this,function(a){
            //get the response state
            var state = a.getState();            
            //check if result is successfull
            if(state == "SUCCESS" && valueOfName != '' && valueOfNumber != '' && valueOfPhoneNumber != ''){
                //Reset Form
                var newAccount = { 'sobjectType': 'Account',
                        'AnnualRevenue': 0};
                //resetting the Values in the form
                component.set("v.newAccount",newAccount);
                component.find('successNotif').showNotice({
            	"variant": "info",
            	"header": "Success!",
            	"message": "Record successfully added .",
                closeCallback: function() {
					$A.get('e.force:refreshView').fire();            	
                }
       			});                 
            } else if(state == "ERROR" || valueOfName == '' || valueOfAmount == 0 || valueOfDate == null){
                component.find('successNotif').showNotice({
            	"variant": "error",
            	"header": "Error!",
            	"message": "Please, enter data in fields.",
                closeCallback: function() {
					$A.get('e.force:refreshView').fire();            	
                }
       			});
            }
        });
		//adds the server-side action to the queue        
        $A.enqueueAction(action);
    },
})