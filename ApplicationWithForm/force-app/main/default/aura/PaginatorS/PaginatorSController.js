({
	previousPage : function(component) {
        var paginatorSEvent = component.getEvent("previousPage");
        paginatorSEvent.fire();
	},
    
	nextPage : function(component) {
        var paginatorSEvent = component.getEvent("nextPage");
        paginatorSEvent.fire();
	}
})