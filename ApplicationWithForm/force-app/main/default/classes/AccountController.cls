public with sharing class AccountController {
    @AuraEnabled 
    public static Map<String, String> getRating(){
        Map<String, String> options = new Map<String, String>();
        Schema.DescribeFieldResult fieldResult = Account.Rating.getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled 
    public static Map<String, String> getOwnership(){
        Map<String, String> options = new Map<String, String>();
        Schema.DescribeFieldResult fieldResult = Account.Ownership.getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled 
    public static Map<String, String> getType(){
        Map<String, String> options = new Map<String, String>();
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
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
        } catch (Exception ex) {
            throw new MyException( ex .getMessage() );
        }
        finally {
            return false;
        }   
    }

    @AuraEnabled
    public static List<Account> getAccounts() {
     	List<Account> accounts = [SELECT Id, Name, Phone, Site, AnnualRevenue, Fax, Type, Rating, Ownership FROM Account WHERE Site != ''];
        return accounts;	
    }
}