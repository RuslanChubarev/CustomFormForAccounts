({
    doInit: function (component, event, helper) {
        //get Promices for picklist
        var action = component.get('c.getAccounts');
        var promiceForAccounts = helper.getAccounts(action);
        var action0 = component.get('c.getRating');
        var promiceRatingPicklist = helper.getPicklist(action0);
        var action1 = component.get('c.getOwnership');
        var promiceOwnershipPicklist = helper.getPicklist(action1);
        var action2 = component.get('c.getType');
        var promiceTypePicklist = helper.getPicklist(action2);
        console.log('end of definition');
        console.log(promiceForAccounts);
        console.log(promiceRatingPicklist);
        console.log(promiceOwnershipPicklist);
        console.log(promiceTypePicklist);

        Promise.all([
            promiceForAccounts,
            promiceRatingPicklist,
            promiceOwnershipPicklist,
            promiceTypePicklist
        ]).then(
            function (result) {
                console.log(result[0]);
                console.log(result[1]);
                console.log(result[2]);
                console.log(result[3]);
                component.set("v.accounts", result[0]);

                var ratingMap = [];
                for (var key in result[1]) {
                    ratingMap.push({ key: key, value: result[1][key] });
                }
                component.set("v.ratingMap", ratingMap);

                var ownershipMap = [];
                for (var key in result[2]) {
                    ownershipMap.push({ key: key, value: result[2][key] });
                }
                component.set("v.ownershipMap", ownershipMap);

                var typeMap = [];
                for (var key in result[3]) {
                    typeMap.push({ key: key, value: result[3][key] });
                }
                component.set("v.typeMap", typeMap);
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        );
        console.log("Not error");

    },

    handleRatingOnChange: function (component) {
        var rating = component.get("v.newAccount.Rating");
    },

    handleOwnershipOnChange: function (component) {
        var ownership = component.get("v.newAccount.Ownership");
    },

    handleTypeOnChange: function (component) {
        var ownership = component.get("v.newAccount.Type");
    },

    clickCreate: function (component) {
        console.log('Create record');

        var inputName = component.find("accountname");
        var valueOfName = inputName.get("v.value");

        var inputNumber = component.find("accountnumber");
        var valueOfNumber = inputNumber.get("v.value");

        var inputPhoneNumber = component.find("phonenumber");
        var valueOfPhoneNumber = inputPhoneNumber.get("v.value");

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