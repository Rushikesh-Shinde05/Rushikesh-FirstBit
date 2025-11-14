package Q1;

public class Queue {
  static int head =0;
  static int tail =0;
  private Node[] queue = new Node[10];
  static Queue ref=new Queue();
  private Queue() {
	  
  }
  public static Queue getObject() {
	  return ref;
  }
  public void Insert(int value) {
	  queue[tail] = new Node(value);
	  tail++;
	  
  }
  public void Delete() {
	  queue[head]=null;
	  head++;
  }
  public void display () {
	  for (int i = head;i<tail;i++);
  }
}
