public with sharing class CampingListController {
    @AuraEnabled
    public static List<Camping_Item__c> getItems() {
        return [SELECT Id, Name, Price__c, Qauntity__c, Packed__c, 
                FROM Camping_Item__c];
    }

    @AuraEnabled
    public static Camping_Item__c saveExpense(Camping_Item__c item) {
        // Perform isUpdateable() checking first, then
        upsert item;
        return item;
    }
}
