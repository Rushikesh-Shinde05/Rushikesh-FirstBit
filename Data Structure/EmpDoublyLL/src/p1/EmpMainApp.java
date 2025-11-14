package p1;

import java.util.Scanner;

public class EmpMainApp {

    public static void main(String[] args) {

        DoublyLLEmp dll = new DoublyLLEmp();
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n\t1. Insert at Beginning");
            System.out.println("\t2. Insert at End");
            System.out.println("\t3. Insert at Given Position");
            System.out.println("\t4. Delete from Beginning");
            System.out.println("\t5. Delete from End");
            System.out.println("\t6. Delete from Given Position");
            System.out.println("\t7. Display Forward");
            System.out.println("\t8. Display Reverse");
            System.out.println("\t9. Exit");
            
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter Employee ID: ");
                    int id1 = sc.nextInt();
                    
                    System.out.print("Enter Employee Name: ");
                    String name1 = sc.next();
                    
                    System.out.print("Enter Employee Salary: ");
                    double sal1 = sc.nextDouble();
                    
                    dll.insertBeg(new Employee(id1, name1, sal1));
                    break;

                case 2:
                    System.out.print("Enter Employee ID: ");
                    int id2 = sc.nextInt();
                    
                    System.out.print("Enter Employee Name: ");
                    String name2 = sc.next();
                    
                    System.out.print("Enter Employee Salary: ");
                    double sal2 = sc.nextDouble();
                    
                    dll.insertEnd(new Employee(id2, name2, sal2));
                    break;

                case 3:
                    System.out.print("Enter Position: ");
                    int pos = sc.nextInt();
                    
                    System.out.print("Enter Employee ID: ");
                    int id3 = sc.nextInt();
                    
                    System.out.print("Enter Employee Name: ");
                    String name3 = sc.next();
                    
                    System.out.print("Enter Employee Salary: ");
                    double sal3 = sc.nextDouble();
                    
                    dll.insertAtPosition(new Employee(id3, name3, sal3), pos);
                    break;

                case 4:
                    dll.deleteBeg();
                    break;

                case 5:
                    dll.deleteEnd();
                    break;

                case 6:
                    System.out.print("Enter Position to Delete: ");
                    int delPos = sc.nextInt();
                    dll.deleteFromPosition(delPos);
                    break;

                case 7:
                    dll.displayForward();
                    break;

                case 8:
                    dll.displayReverse();
                    break;

                case 9:
                    System.out.println("Exiting... Bye Bye!");
                    break;

                default:
                    System.out.println("Invalid Choice!");
            }

        } while (choice != 9);

        sc.close();
    }
}
