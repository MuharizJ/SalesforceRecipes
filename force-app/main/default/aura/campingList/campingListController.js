({
    // Load Camping List Items from Salesforce
    doInit: function(component, event, helper) {
        // Create the action
        var action = component.get("c.getItems");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },

    // Comes from the child component's custom event firing on a add of a new item
    handleAddItem: function(component, event, helper) {
        var newItem = event.getParam("item"); // the param name in the custom event
        
        var action = component.get("c.saveItem"); // the apex controller's save method name
        action.setParams({"item": newItem}); // "item" is the parameter name in the APEX save method
        
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
            
                var parsedCampingItemReturnValue = JSON.parse(JSON.stringify(response.getReturnValue())); // get the value back from the response (Apex Save Method)
                var items = JSON.parse(JSON.stringify(component.get("v.items"))); // items is the array in the main parent component
                
                items.push(parsedCampingItemReturnValue);
                component.set("v.items",items);
            }
        });
        $A.enqueueAction(action);  
    } 
})