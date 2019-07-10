({
    createItem : function(component, newCampingItem) {

        var action = component.get("c.saveItem");
        action.setParams({
            "item": newCampingItem
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var parsedCampingItemReturnValue = JSON.parse(JSON.stringify(response.getReturnValue()));
                var campingItems = JSON.parse(JSON.stringify(component.get("v.items")));
                campingItems.push(parsedCampingItemReturnValue);
                component.set("v.items", campingItems);
                component.set("v.newItem",{'sobjectType':'Camping_Item__c',
                'Name': '',
                'Quantity__c': 0,
                'Price__c': 0,
                'Packed__c': false});
            }
        });
        $A.enqueueAction(action);
    }
})
