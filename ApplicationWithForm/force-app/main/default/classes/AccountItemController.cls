public class AccountItemController {
	@AuraEnabled
    public static void deleteAccount(Account myAccount) {
        try {
            System.debug('deleteAccountRecord::deleteAccount::account'+myAccount);
            if(myAccount != null) {
                delete myAccount;
            }
        }
        catch (Exception ex) {
            throw new MyException(ex .getMessage());
        }            
    }
    
    @AuraEnabled
    public static List<Contact> getContacts(id myAccountId) {
        integer i = 0;
        return [SELECT Id, Name, Phone FROM Contact WHERE AccountId = :myAccountId];
    }
}