({
    doInit: function (component, event, helper) {
        var idOfAccount = component.get("v.account.Id");
        var action = component.get("c.getContacts");
        action.setParams({
            "myAccountId": idOfAccount,
        });
        helper.call(action).then(function(contacts){
            component.set("v.contacts",contacts);
		},function(err){
			component.find('notifaboutdelete').showNotice({
                "variant": "error",
                "header": "Error!",
                "message": "Record was not successfully retrieve .",
                closeCallback: function () {
                    $A.get('e.force:refreshView').fire();
                }
            });
		})        
    },

    handleSelect: function (component, event, helper) {
        var menuValue = event.detail.menuItem.get("v.value");
        switch (menuValue) {
            case "1": helper.doEdit(component, event); break;
            case "2": helper.doDelete(component, event); break;
        }
    },

    newContact: function (component, event, helper) {
        var idOfAccount = component.get("v.account.Id");
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Contact",
            "defaultFieldValues": {
                'AccountId': idOfAccount
            }
        });
        createRecordEvent.fire();
    }
})