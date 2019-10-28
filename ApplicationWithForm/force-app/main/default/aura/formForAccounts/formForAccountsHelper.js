({
    getAccounts: function (action) {
        return new Promise($A.getCallback(function (resolve, reject) {
            action.setCallback(this, function (a) {
                var err = a.getError();
                var result = a.getReturnValue();
                if (err && err.length > 0) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getPicklist: function (action) {
        return new Promise($A.getCallback(function (resolve, reject) {
            action.setCallback(this, function (list) {
                var err = list.getError();
                var result = list.getReturnValue();
                if (err && err.length > 0) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
            $A.enqueueAction(action);
        }));
    },

    /*
    getOwnershipPicklist: function (component) {
        return new Promise($A.getCallback(function () {
            action = component.get("c.getOwnership");
            action.setCallback(this, function (ownerships) {
                var result = ownerships.getReturnValue();
                var state = result.getState();
                if (state === "SUCCESS") {
                    resolve(ownerships.getReturnValue());
                } else {
                    reject(new Error(ownerships.getError()));
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getTypePicklist: function (component) {
        return new Promise($A.getCallback(function () {
            action = component.get("c.getType");
            action.setCallback(this, function (types) {
                var result = types.getReturnValue();
                var state = result.getState();
                if (state === "SUCCESS") {
                    resolve(types.getReturnValue());
                } else {
                    reject(new Error(types.getError()));
                }
            });
            $A.enqueueAction(action);
        }));
    }
    */
})