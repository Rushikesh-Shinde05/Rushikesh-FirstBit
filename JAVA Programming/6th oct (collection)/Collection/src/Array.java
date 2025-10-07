import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.TreeSet;


public class Array {
public static void main (String [] args) {
	//ArrayList al = new ArrayList();
	LinkedList al = new LinkedList();
	al.add(10);
	al.add(30);
	al.add(50);
	al.add(70);
	al.add(20);
	al.add(60);
	al.add(40);
	System.out.println(al);
	System.out.println(al.get(0));
	
	TreeSet t1 = new TreeSet();
	t1.add(10);
	t1.add(30);
	t1.add(50);
	t1.add(70);
	t1.add(20);
	t1.add(60);
	t1.add(40);
	System.out.println(t1);
	System.out.println(t1.add(0));
	
	HashSet h1 = new HashSet();
	h1.add(10);
	h1.add(30);
	h1.add(50);
	h1.add(70);
	h1.add(20);
	h1.add(60);
	h1.add(40);
	System.out.println(h1);
	System.out.println(h1.add(0));
}
}
