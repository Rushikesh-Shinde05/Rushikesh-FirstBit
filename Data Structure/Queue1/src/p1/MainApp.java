package p1;
public class MainApp {
	public static void main(String [] args)
	{
		MainApp app=new MainApp();
		app.insert(0);
		app.insert(10);
		app.insert(90);
		app.insert(40);
		app.insert(110);
		app.display();
		
		app.delete();
		app.delete();
		app.insert(78);
		app.insert(6);
		app.display();
	}
	public void insert(int val)
	{
		MyQueue myQueue=MyQueue.getMyQueue();
		myQueue.push(val);
		
	}
	public void delete()
	{
		MyQueue myQueue=MyQueue.getMyQueue();
		myQueue.pop();
		
	}
	public void display()
	{
		MyQueue myQueue=MyQueue.getMyQueue();
		myQueue.display();
		
	}
}
