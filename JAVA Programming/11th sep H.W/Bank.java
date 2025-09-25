import java.util.Scanner;                             
class Bank
{
	int accno;
	String holdername;
	double balance;
	static double intenrestrate;//step 1

	static 
	{
		intenrestrate=10;
	}//step 2

	Bank()//step 3 constructor remove interest
	{
		this.accno=456;
		this.holdername="sbi";
		this.balance=20.00;
		//this.intenrestrate=2.0;
	}
	Bank(int a,String n,double ba)
	{
		this.accno=a;
		this.holdername=n;
		this.balance=ba;
		//this.intenrestrate=b;
	}
	void setAccno(int no)
	{
		this.accno=no;
	}
	void setHoldername(String name)
	{
		this.holdername=name;
	}
	void setBalance(double balance)
	{
		this.balance=balance;
	}
	static void setInterest(double i)
	{
		intenrestrate=i;
	}

	int getAccno()
	{
		return accno;
	}
	String getHoldername()
	{
		return holdername;
	}
	double getBalance()
	{
		return balance;
	}
	double getInterest()
	{
		return intenrestrate;
	}
	void display()
	{
		System.out.println("Account no:"+this.accno);
		System.out.println("Holder Name:"+this.holdername);
		System.out.println("Balance:"+this.balance);
		System.out.println("interest:"+this.intenrestrate+"\n");
	}
}

class Test
{
	public static void main (String [] a)
	{

		
		
		Bank b1=new Bank(101,"ram",5000);
		b1.display();

		Bank b2=new Bank(102,"gopal",10000);
		b2.display();

		Bank b3=new Bank(103,"vinu",1);
		b3.display();
		b1.setInterest(7.5);
		b1.display();
		b2.display();
		b3.display();


	}
}	