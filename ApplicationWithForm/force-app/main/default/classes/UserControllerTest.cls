@isTest
public class UserControllerTest {
    @isTest
    public static void getUserTest() {
    	User currentUser = [SELECT Id, Name, Budget__c, Username FROM User WHERE Username = 'ruslan.chubarev@gmail.com'];
		System.assertEquals( currentUser, UserController.getUser());    
    }
    
}