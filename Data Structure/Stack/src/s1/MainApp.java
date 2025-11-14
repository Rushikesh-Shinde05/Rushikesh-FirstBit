package s1;

public class MainApp {

	public static void main(String [] args)
	{	MainApp app=new MainApp();	
//		app.insert(10);
//		app.insert(20);
//		app.insert(30);
//		app.insert(40);
//		app.insert(50);
//		app.displayData();
//		app.showTopElement();
		
		int [] nums= {11,7,50,45,40,13,35,17,30,25,20,15,10,5,3,2};
		app.addArrayToStack(nums);
		app.displayData();
		app.findMinMax();
		app.EvenOdd();
		app.showTopElement();
		app.insert(99);
		app.displayData();
		app.delete();
		app.displayData();
		app.removePrimeNums();
		app.displayData();
	}
	
	public  void insert(int val)
	{
		MyStack myStack=MyStack.getRef();
		myStack.push(val);
		
	}
	public void delete()
	{
		MyStack myStack=MyStack.getRef();
		myStack.pop();
		
	}
	public void showTopElement()
	{
		MyStack myStack=MyStack.getRef();
		myStack.peek();
	}
	public void displayData()
	{
		MyStack myStack=MyStack.getRef();
		myStack.display();	
	}
	public void addArrayToStack(int[] nums)
	{
		MyStack myStack=MyStack.getRef();
		myStack.addArrarToStack(nums);
	}
	public void findMinMax()
	{
		MyStack myStack=MyStack.getRef();
		myStack.findMinMax();
	}
	
	public void removePrimeNums()
	{
		MyStack myStack=MyStack.getRef();
		myStack.removePrimeNums();
	}
	
	public void EvenOdd()
	{
		MyStack myStack=MyStack.getRef();
		myStack.findEvenOdd();
	}
}
