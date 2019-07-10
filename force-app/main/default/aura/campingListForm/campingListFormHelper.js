({
    createItem : function(component, newCampingItem) {
        
        var updateEvent = component.getEvent("addItem");
        updateEvent.setParams({ "item": newCampingItem });
        updateEvent.fire();

        component.set("v.newItem",{'sobjectType':'Camping_Item__c',
        'Name': '',
        'Quantity__c': 0,
        'Price__c': 0,
        'Packed__c': false});
    }
})
