package p1;

public class MyLinkedList {
    Node start;

   public void add(int data) {
	   
	Node temp = new Node(data, null);
	start = temp;
	if (start == null) {
		start = temp;
		}else {
			start.next=temp;
		}
	
System.out.println(data);
   }

   public void display() {
	// TODO Auto-generated method stub
	
   }
  
}
