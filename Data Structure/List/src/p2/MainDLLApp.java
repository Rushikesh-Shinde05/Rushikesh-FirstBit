package p2;


import java.util.Scanner;

public class MainDLLApp {

	public static void main(String[] args) {
		DoublyDLL ddl = new DoublyDLL();
		Scanner sc = new Scanner(System.in);
		int choice,ele,pos;
		
		do {
			System.out.println("\t1.Insert Begining ");
			System.out.println("\t2.Insert End ");
			System.out.println("\t3.Insert Position ");
			System.out.println("\t4.Display Forward ");
			System.out.println("\t10.EXIT ");
			System.out.print("Enter Your Choice : ");
			choice = sc.nextInt();
			
			switch(choice) {
				case 1 :{
					System.out.println("Enter Data : ");
					ele = sc.nextInt();
					ddl.insertBeg(ele);
					break;
				}
				case 2 : {
					System.out.println("Enter Data : ");
					ele = sc.nextInt();
					ddl.insertEnd(ele);
					break;
				}
				case 3 :{
					System.out.println("Enter Data : ");
					ele = sc.nextInt();
					System.out.println("Enter position : ");
					pos = sc.nextInt();
					ddl.insertAtPos(ele,pos);
					break;
				}
				case 4 : {
					ddl.displayForward();
					break;
				}
				case 10 :{
					System.out.println("----- Bye Bye ! -----");
					break;
				}
				default :{
					System.out.println("----- Invalid Choice! -----");
				}
			}
		}while(choice!=5);
		sc.close();
	}

}
