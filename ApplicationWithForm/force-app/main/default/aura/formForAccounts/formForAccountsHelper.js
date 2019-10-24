({
    //get Rating Picklist Value
    getRatingPicklist: function(component, event) {
        var action = component.get("c.getRating");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var ratingMap = [];
                for(var key in result){
                    ratingMap.push({key: key, value: result[key]});
                }
                component.set("v.ratingMap", ratingMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    getOwnershipPicklist: function(component, event) {
        var action = component.get("c.getOwnership");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var ownershipMap = [];
                for(var key in result){
                    ownershipMap.push({key: key, value: result[key]});
                }
                component.set("v.ownershipMap", ownershipMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    getTypePicklist: function(component, event) {
        var action = component.get("c.getType");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var typeMap = [];
                for(var key in result){
                    typeMap.push({key: key, value: result[key]});
                }
                component.set("v.typeMap", typeMap);
            }
        });
        $A.enqueueAction(action);
    }
})