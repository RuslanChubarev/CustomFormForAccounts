({
    call: function(action, params) {
        return new Promise($A.getCallback(function(resolve, reject) {
            if (params) {
                action.setParams(params);
            }
            action.setCallback(this, function(a) {
                var err = a.getError();
                var result = a.getReturnValue();
                if (err && err.length > 0) reject(err);
                else resolve(result);
            });
            $A.enqueueAction(action, false);
        }));

    },
    
    doDelete: function (component, event, helper) {
        console.log('Delete record');

        var mainAccount = component.get("v.account");

        var action = component.get("c.deleteAccount");

        action.setParams({
            "myAccount": mainAccount
        });

        action.setCallback(this, function (a) {
            var state = a.getState();

            if (state == "SUCCESS") {
                component.find('notifaboutdelete').showNotice({
                    "variant": "info",
                    "header": "Success!",
                    "message": "Record successfully deleted .",
                    closeCallback: function () {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            } else if (state == "ERROR") {
                component.find('notifaboutdelete').showNotice({
                    "variant": "error",
                    "header": "Error!",
                    "message": "Record was not successfully deleted .",
                    closeCallback: function () {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            }
        });

        $A.enqueueAction(action);
    },

    doEdit: function (component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");

        editRecordEvent.setParams({
            "recordId": component.get("v.account.Id")
        });
        editRecordEvent.fire();
    },

})