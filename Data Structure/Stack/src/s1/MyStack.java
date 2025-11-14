package s1;

public class MyStack {
	
	 private int top=0;
	 private Node [] arr=new Node[50]; 
	 private static MyStack ref=new MyStack();
	 private MyStack()
	 {
		 
	 }

	public MyStack(Node[] arr) {
		this.arr = arr;
	}
	 
	
	
	

	public static MyStack  getRef()
	{
		return ref;
	}
	
	
	public void push(int val)
	{
		if(top<arr.length)
		{
			arr[top++]=new Node(val);
			System.out.println("element added");
		}
		else
		{
			System.out.println("stack is full");
			return;
		}
	}
	
	public void pop()
	{
		if(top>=0)
		{
			top--;
			System.out.println("\nelement removed");
		}
		else
		{
			System.out.println("Stack is empty");
			return;
		}

		
	}
	
	public void display()
	{
		if(top<=0)
		{
			System.out.println("stack is empty");
		}
		else
		{
			int itr=top-1;
			while(itr>=0)
			{
				System.out.print(arr[itr].getData()+" ");
				itr--;
			}
		}
	
		
	}
	 
	public void peek()
	{
		System.out.println("\nTop Element:"+arr[top-1].getData());
	}
	
	public void addArrarToStack(int[] nums)
	{
		for(int itr=0;itr<nums.length;itr++)
		{
			arr[top++]=new Node(nums[itr]);
		}
		
		System.out.println("Elements added to stack successfully");
	}
	
	public void removePrimeNums() {
		
		for(int itr=top-1;itr>=0;itr--)
		{
			int flag=0;
			if(arr[itr].getData()<2)
			{
				flag=1;
			}
			else
			{
				for(int div=2;div<arr[itr].getData();div++)
				{
					if(arr[itr].getData()%div==0)
					{
						flag=1;
						break;
					}
				}
			}
	
			if(flag==0)
			{
				for(int temp=itr;temp<top-1;temp++)
				{
					arr[temp]=arr[temp+1];
					
				}
				top--;
			}
			
			
		}
		
		System.out.println("\nprime numbers removed");
	}
	 
	public void findMinMax()
	{
		int max=arr[top-1].getData();
		for(int itr=top-1;itr>=0;itr--)
		{
			if(arr[itr].getData()>max)
			{
				max=arr[itr].getData();
			}
		}
		int min=arr[top-1].getData();
		for(int itr=top-1;itr>=0;itr--)
		{
			if(arr[itr].getData()<min)
			{
				min=arr[itr].getData();
			}
		}
		
		System.out.println("\nmax value in stack is : "+max);
		System.out.println("\nmin value in stack is :"+min);
	}
	
	public void findEvenOdd()
	{
		System.out.println("\nEven Nums in stack: ");
		for(int itr=top-1;itr>=0;itr--)
		{
			if(arr[itr].getData()%2==0)
			{
				System.out.print(+arr[itr].getData()+" ");
			}
		}
		
		System.out.println("\nOdd Nums in stack: ");
		for(int itr=top-1;itr>=0;itr--)
		{
			if(arr[itr].getData()%2!=0)
			{
				System.out.print(+arr[itr].getData()+" ");
			}
		}
		
	}
}
