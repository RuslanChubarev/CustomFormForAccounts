({
    doInit: function (component, event, helper) {
        helper.getRatingPicklist(component, event);
        helper.getOwnershipPicklist(component, event);
        helper.getTypePicklist(component, event);
        helper.call(component.get("c.getAccounts")).then(function(accounts){
            component.set("v.accounts", accounts());
		},function(err){
			component.find('notifaboutdelete').showNotice({
                "variant": "error",
                "header": "Error!",
                "message": "Record was not successfully deleted .",
                closeCallback: function () {
                    $A.get('e.force:refreshView').fire();
                }
            });
		})
    },

    handleRatingOnChange: function (component, event, helper) {
        var rating = component.get("v.newAccount.Rating");
    },

    handleOwnershipOnChange: function (component, event, helper) {
        var ownership = component.get("v.newAccount.Ownership");
    },

    handleTypeOnChange: function (component, event, helper) {
        var ownership = component.get("v.newAccount.Type");
    },

    clickCreate: function (component, event, helper) {
        console.log('Create record');

        var inputName = component.find("accountname");
        var valueOfName = inputName.get("v.value");

        var inputNumber = component.find("accountnumber");
        var valueOfNumber = inputNumber.get("v.value");

        var inputSite = component.find("accountsite");
        var valueOfSite = inputSite.get("v.value");

        var inputPhoneNumber = component.find("phonenumber");
        var valueOfPhoneNumber = inputPhoneNumber.get("v.value");

        var inputAnnualRevenue = component.find("accountannualrevenue");
        var valueOfAnnualRevenue = inputAnnualRevenue.get("v.value");

        var inputFax = component.find("fax");
        var valueOfFax = inputFax.get("v.value");

        var mainAccount = component.get("v.newAccount");

        var action = component.get("c.saveAccount");

        action.setParams({
            "myAccount": mainAccount
        });

        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state == "SUCCESS" && valueOfName != null && valueOfNumber != null && valueOfPhoneNumber != null) {
                alert(valueOfName);
                var newAccount = {
                    'sobjectType': 'Account',
                    'AnnualRevenue': 0
                };
                component.set("v.newAccount", newAccount);
                component.find('successNotif').showNotice({
                    "variant": "info",
                    "header": "Success!",
                    "message": "Record successfully added .",
                    closeCallback: function () {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            } else if (state == "ERROR" || valueOfName == null || valueOfNumber == null || valueOfNumber == null) {
                component.find('successNotif').showNotice({
                    "variant": "error",
                    "header": "Error!",
                    "message": "Please, enter data in fields.",
                    closeCallback: function () {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            }
        });
        $A.enqueueAction(action);
    },
})