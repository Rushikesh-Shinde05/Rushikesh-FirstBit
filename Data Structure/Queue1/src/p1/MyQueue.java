package p1;
public class MyQueue {

	private Node [] queue=new Node[5];
	private int head=0,tail=0;
	private static MyQueue myQueue=new MyQueue();
	int flag=0;
	
	public MyQueue() {

	}

	public MyQueue(Node[] queue) {

		this.queue = queue;
	}

	public static MyQueue getMyQueue() {
		return myQueue;
	}
	
	public void push(int val)
	{
		if(head==tail)
		{
			head=0;
			tail=0; 
		}
//		if(head+tail==queue.length)
//		{
//			System.out.println("queue is full");
//		}
//		else
//		{
//			if(tail==queue.length && head!=0)
//			{
//				tail=0;
//				flag=1;
//			}
//			queue[tail]=new Node(val);
//			tail++;
//		}

		
		if(head>0)
		{
			int itr=0;
			while(itr<head && head<tail)
			{
				queue[itr]=queue[head];
				itr++;
				head++;
			}
			tail=itr;
			head=0;
			System.out.println("elemnt addeded in queue when head is not zero");
		}
		
		if(tail<queue.length)
		{
			queue[tail++]=new Node(val);
		
			System.out.println("element added to queue");
		}
		else
		{
			System.out.println("\nqueue is full");
		}

		
	}

	
	public void pop() {
		if(head<tail)
		{
			head++;
			System.out.println("elemnt removed from queue");
		}
		else
		{
			System.out.println("queue is empty");
		}
	}
	public void display()
	{
//		if(flag==1)
//		{
//			int itr=head;
//			while(itr<queue.length)
//			{
//				System.out.print(queue[itr].getData()+" ");
//				itr++;
//			}
//			itr=0;
//			while(itr<tail)
//			{
//				System.out.print(queue[itr].getData()+" ");
//				itr++;
//			}
//			
//		}
		
//		else
//		{
			
			int itr=head;
			while(itr<tail)
			{
				System.out.print(queue[itr].getData()+" ");
				itr++;
			}
//		}
		
		

	}
	
}
