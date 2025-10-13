package controller;

import java.util.ArrayList;
import model.Admin;
import model.Employee;
import model.HR;
import model.SalesManager;

public class EmployeeDAO {

    static ArrayList<Employee> employees = new ArrayList<Employee>();

    static {
        employees.add(new HR(101, "Rushikesh", 50000, 5000));
        employees.add(new HR(102, "Prathamesh", 48000, 4500));
        employees.add(new HR(103, "Pratik", 47000, 4000));

        employees.add(new SalesManager(201, "Aavanish", 60000, 12, 8000));
        employees.add(new SalesManager(202, "Bahvesh", 58000, 15, 7500));
        employees.add(new SalesManager(203, "Nitin", 62000, 10, 9000));

        employees.add(new Admin(301, "Hitesh", 70000, 10000));
        employees.add(new Admin(302, "Darshan", 68000, 9500));
        employees.add(new Admin(303, "Prashant", 72000, 11000));
        employees.add(new Admin(304, "Shubham", 75000, 12000));
    }

        public boolean addEmployee(Employee e) {
        return employees.add(e);
    }

        public Employee searchEmployeeById(int id) {
        for (int i = 0; i < employees.size(); i++) {
            Employee emp = employees.get(i);
            if (emp.getId() == id) {
                return emp;
            }
        }
        return null;
    }

        public boolean updateEmployee(int id, double newSalary) {
        Employee emp = searchEmployeeById(id);
        if (emp != null) {
            emp.setSalary(newSalary);
            return true;
        }
        return false;
    }

        public boolean deleteEmployee(int id) {
        Employee emp = searchEmployeeById(id);
        if (emp != null) {
            employees.remove(emp);
            return true;
        }
        return false;
    }

        public ArrayList<Employee> getAllEmployee() {
        return employees;
    }

        public ArrayList<Employee> searchEmployeeByName(String name) {
        ArrayList<Employee> list = new ArrayList<Employee>();
        for (int i = 0; i < employees.size(); i++) {
            Employee emp = employees.get(i);
            if (emp.getName().equalsIgnoreCase(name)) {
                list.add(emp);
            }
        }
        return list;
    }

        public double calculateTotalPayroll() {
        double total = 0;
        for (int i = 0; i < employees.size(); i++) {
            Employee emp = employees.get(i);
            total = total + emp.calculateSalary();
        }
        return total;
    }

        public ArrayList<Employee> sortEmployees(int option) {
        ArrayList<Employee> sorted = new ArrayList<Employee>(employees);

        if (option == 1) { // Sort by ID
            for (int i = 0; i < sorted.size() - 1; i++) {
                for (int j = i + 1; j < sorted.size(); j++) {
                    if (sorted.get(i).getId() > sorted.get(j).getId()) {
                        Employee temp = sorted.get(i);
                        sorted.set(i, sorted.get(j));
                        sorted.set(j, temp);
                    }
                }
            }
        } else if (option == 2) { // Sort by Name
            for (int i = 0; i < sorted.size() - 1; i++) {
                for (int j = i + 1; j < sorted.size(); j++) {
                    if (sorted.get(i).getName().compareToIgnoreCase(sorted.get(j).getName()) > 0) {
                        Employee temp = sorted.get(i);
                        sorted.set(i, sorted.get(j));
                        sorted.set(j, temp);
                    }
                }
            }
        } else if (option == 3) { // Sort by Salary
            for (int i = 0; i < sorted.size() - 1; i++) {
                for (int j = i + 1; j < sorted.size(); j++) {
                    if (sorted.get(i).getSalary() > sorted.get(j).getSalary()) {
                        Employee temp = sorted.get(i);
                        sorted.set(i, sorted.get(j));
                        sorted.set(j, temp);
                    }
                }
            }
        }

        return sorted;
    }

        public ArrayList<Employee> filterByType(int type) {
        ArrayList<Employee> list = new ArrayList<Employee>();

        for (int i = 0; i < employees.size(); i++) {
            Employee emp = employees.get(i);

            if (type == 1 && emp instanceof HR) {
                list.add(emp);
            } else if (type == 2 && emp instanceof Admin) {
                list.add(emp);
            } else if (type == 3 && emp instanceof SalesManager) {
                list.add(emp);
            }
        }
        return list;
    }
}
