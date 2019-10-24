public with sharing class AccountController {
    @AuraEnabled //get Account Rating Picklist Values
    public static Map<String, String> getRating(){
        Map<String, String> options = new Map<String, String>();
        //get Account Rating Field Describe
        Schema.DescribeFieldResult fieldResult = Account.Rating.getDescribe();
        //get Account Rating Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled //get Account Ownership Picklist Values
    public static Map<String, String> getOwnership(){
        Map<String, String> options = new Map<String, String>();
        //get Account Ownership Field Describe
        Schema.DescribeFieldResult fieldResult = Account.Ownership.getDescribe();
        //get Ownership Rating Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled //get Account Type Picklist Values
    public static Map<String, String> getType(){
        Map<String, String> options = new Map<String, String>();
        //get Account Ownership Field Describe
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        //get Ownership Rating Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled
    public static boolean saveAccount(Account myAccount) {        
		try{
            System.debug('CreateAccountRecord::createRecord::account'+myAccount);            
            if(myAccount != null) {
                insert myAccount;
                return true;
            } else {
                return false;
            }           
        } catch (Exception ex){
        	System.debug('Exception');     
        }
        return false;
    }

    @AuraEnabled
    public static List<Account> getAccounts() {
     	List<Account> accounts = [SELECT Id, Name, Phone, Site, AnnualRevenue, Fax, Type, Rating, Ownership FROM Account WHERE Site != ''];
        return accounts;	
    }
}