
class Bank {
	int accno;
	String holdername;
	double balance;
	static double intenrestrate;
	Bank(int accno, String holdername, double balance) {
		super();
		this.accno = accno;
		this.holdername = holdername;
		this.balance = balance;
	}
	int getAccno() {
		return accno;
	}
	void setAccno(int accno) {
		this.accno = accno;
	}
	String getHoldername() {
		return holdername;
	}
	void setHoldername(String holdername) {
		this.holdername = holdername;
	}
	double getBalance() {
		return balance;
	}
	void setBalance(double balance) {
		this.balance = balance;
	}
	 double getIntenrestrate() {
		return intenrestrate;
	}
	 void setIntenrestrate(double intenrestrate) {
		Bank.intenrestrate = intenrestrate;
	}
	void display() {
	    System.out.println("Account No: " + accno);
	    System.out.println("Holder Name: " + holdername);
	    System.out.println("Balance: " + balance);
	    System.out.println("Interest Rate: " + intenrestrate);
	}

	
	
} //Bank class ends here

class Saving extends Bank
{ 
	   String SavingAcc;

	   Saving(int accno, String holdername, double balance, String savingAcc) {
		super(accno, holdername, balance);
		SavingAcc = savingAcc;
	   }

	   String getSavingAcc() {
		   return SavingAcc;
	   }

	   void setSavingAcc(String savingAcc) {
		   SavingAcc = savingAcc;
	   }
	   void display() {
		   super.display();
		   System.out.println("IS YOUR ACCOUNT SAVING: " +SavingAcc);
	   }
} //Saving account ends here

class CurrentAcc extends Bank
{
	String currentAcc;

	CurrentAcc(int accno, String holdername, double balance, String currentAcc) {
		super(accno, holdername, balance);
		this.currentAcc = currentAcc;
	}

	String getCurrentAcc() {
		return currentAcc;
	}

	void setCurrentAcc(String currentAcc) {
		this.currentAcc = currentAcc;
	}
	void display() {
		super.display();
		System.out.println("IS YOUR ACCOUNT CURRENT:" +currentAcc);
	}
	
}//Current account class ends here

class Test{
	public static void main(String [] args) {
		Bank b1 = new Bank (001, "donkt know", 1862);
		b1.display();
		
		Saving s1 = new Saving (002, "unkonown", 566554, "Yes");
		s1.display();
		
		CurrentAcc c1 = new CurrentAcc(003, "Jhon doe", 54616, "Yes");
		c1.display();
	}
}
