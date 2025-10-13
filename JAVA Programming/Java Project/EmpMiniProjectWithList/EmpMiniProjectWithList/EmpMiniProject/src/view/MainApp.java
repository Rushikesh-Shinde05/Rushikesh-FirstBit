
package view;

import java.util.ArrayList;
import java.util.Scanner;
import controller.EmployeeDAO;
import model.Admin;
import model.Employee;
import model.HR;
import model.SalesManager;

public class MainApp {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        EmployeeDAO dao = new EmployeeDAO();
        ArrayList<Employee> employees = null;
        int choice;

        do {
            System.out.println("\n===== Employee Management Menu =====");
            System.out.println("1. Add Employee");
            System.out.println("2. Search Employee by ID");
            System.out.println("3. Update Employee Salary");
            System.out.println("4. Delete Employee");
            System.out.println("5. Display All Employees");
            System.out.println("6. Calculate Salary of Each Employee");
            System.out.println("7. Search Employee by Name");
            System.out.println("8. Calculate Total Payroll");
            System.out.println("9. Sort Employees");
            System.out.println("10. Filter Employees by Type");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
            case 1:
                System.out.println("Enter Employee Type (1-HR, 2-Admin, 3-SalesManager): ");
                int type = sc.nextInt();

                System.out.print("Enter ID: ");
                int id = sc.nextInt();
                sc.nextLine();

                System.out.print("Enter Name: ");
                String name = sc.nextLine();

                System.out.print("Enter Base Salary: ");
                double salary = sc.nextDouble();

                if (type == 1) {
                    System.out.print("Enter Commission: ");
                    double comm = sc.nextDouble();
                    dao.addEmployee(new HR(id, name, salary, comm));
                    System.out.println("HR added successfully!");
                } else if (type == 2) {
                    System.out.print("Enter Allowance: ");
                    double allowance = sc.nextDouble();
                    dao.addEmployee(new Admin(id, name, salary, allowance));
                    System.out.println("Admin added successfully!");
                } else if (type == 3) {
                    System.out.print("Enter Target: ");
                    int target = sc.nextInt();
                    System.out.print("Enter Incentive per Target: ");
                    double incentive = sc.nextDouble();
                    dao.addEmployee(new SalesManager(id, name, salary, target, incentive));
                    System.out.println("Sales Manager added successfully!");
                } else {
                    System.out.println("Invalid Type!");
                }
                break;

            case 2:
                System.out.print("Enter ID to search: ");
                id = sc.nextInt();
                Employee e = dao.searchEmployeeById(id);
                if (e != null)
                    System.out.println("Found Employee:\n" + e);
                else
                    System.out.println("Employee not found.");
                break;

            case 3:
                System.out.print("Enter ID to update salary: ");
                id = sc.nextInt();
                System.out.print("Enter New Salary: ");
                salary = sc.nextDouble();
                if (dao.updateEmployee(id, salary))
                    System.out.println("Salary updated successfully!");
                else
                    System.out.println("Employee not found.");
                break;

            case 4:
                System.out.print("Enter ID to delete: ");
                id = sc.nextInt();
                if (dao.deleteEmployee(id))
                    System.out.println("Employee deleted successfully!");
                else
                    System.out.println("Employee not found.");
                break;

            case 5:
                employees = dao.getAllEmployee();
                if (employees.isEmpty())
                    System.out.println("No employees available!");
                else {
                    System.out.println("\n--- Employee List ---");
                    for (int i = 0; i < employees.size(); i++) {
                        System.out.println(employees.get(i));
                        System.out.println("---------------------");
                    }
                }
                break;

            case 6:
                employees = dao.getAllEmployee();
                for (int i = 0; i < employees.size(); i++) {
                    Employee emp = employees.get(i);
                    System.out.println(emp.getName() + " → Final Salary: " + emp.calculateSalary());
                }
                break;

            case 7:
                sc.nextLine();
                System.out.print("Enter Name to search: ");
                String searchName = sc.nextLine();
                ArrayList<Employee> found = dao.searchEmployeeByName(searchName);
                if (found.isEmpty())
                    System.out.println("No employee found with that name!");
                else {
                    System.out.println("\n--- Employees Found ---");
                    for (int i = 0; i < found.size(); i++) {
                        System.out.println(found.get(i));
                        System.out.println("---------------------");
                    }
                }
                break;

            case 8:
                double total = dao.calculateTotalPayroll();
                System.out.println("Total Payroll (All Employees): " + total);
                break;

            case 9:
                System.out.println("Sort by: 1.ID  2.Name  3.Salary");
                int opt = sc.nextInt();
                ArrayList<Employee> sorted = dao.sortEmployees(opt);
                System.out.println("\n--- Sorted Employees ---");
                for (int i = 0; i < sorted.size(); i++) {
                    System.out.println(sorted.get(i));
                    System.out.println("---------------------");
                }
                break;

            case 10:
                System.out.println("Filter: 1.HR  2.Admin  3.SalesManager");
                int fType = sc.nextInt();
                ArrayList<Employee> filtered = dao.filterByType(fType);
                if (filtered.isEmpty())
                    System.out.println("No employee found of that type!");
                else {
                    System.out.println("\n--- Filtered Employees ---");
                    for (int i = 0; i < filtered.size(); i++) {
                        System.out.println(filtered.get(i));
                        System.out.println("---------------------");
                    }
                }
                break;

            case 0:
                System.out.println("Exiting... Goodbye!");
                break;

            default:
                System.out.println("Invalid choice! Please try again.");
            }
        } while (choice != 0);

    }
}
