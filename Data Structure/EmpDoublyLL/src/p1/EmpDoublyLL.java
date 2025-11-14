package p1;

public class EmpDoublyLL {

    Node start, end; 

    public void insertBeg(Employee emp) {
        Node temp = new Node(emp);
        if (start == null) {
            start = end = temp;
        } else {
            temp.next = start;
            start.prev = temp;
            start = temp;
        }
        System.out.println("Inserted at Beginning Successfully-------------");
    }

    public void insertEnd(Employee emp) {
        Node temp = new Node(emp);
        if (start == null) {
            start = end = temp;
        } else {
            end.next = temp;
            temp.prev = end;
            end = temp;
        }
        System.out.println("Inserted at End Successfully---------------");
    }

    public void insertAtPosition(Employee emp, int pos) {
        Node temp = new Node(emp);

        if (start == null || pos <= 1) {
            insertBeg(emp);
            return;
        }

        int count = 0;
        Node itr = start;
        while (itr != null) {
            count++;
            itr = itr.next;
        }

        if (pos > count) {
            insertEnd(emp);
            return;
        }

        if (pos - 1 <= count - pos) {
            itr = start;
            for (int i = 1; i < pos - 1 && itr != null; i++) {
                itr = itr.next;
            }
        } else {
            itr = end;
            for (int i = count; i >= pos && itr != null; i--) {
                itr = itr.prev;
            }
        }

        Node nextNode = itr.next;
        itr.next = temp;
        temp.prev = itr;
        temp.next = nextNode;
        
        if (nextNode != null)
            nextNode.prev = temp;
        else
            end = temp;

        System.out.println("Inserted at Position " + pos);
    }

    public void deleteBeg() {
        if (start == null) {
            System.out.println("List Empty!");
            return;
        }

        System.out.println("Deleted Employee: " + start.data.name);
        if (start.next == null) {
            start = end = null;
        } else {
            start = start.next;
            start.prev = null;
        }
    }

    public void deleteEnd() {
        if (end == null) {
            System.out.println("List Empty!");
            return;
        }

        System.out.println("Deleted Employee: " + end.data.name);
        if (end.prev == null) {
            start = end = null;
        } else {
            end = end.prev;
            end.next = null;
        }
    }

    public void deleteFromPosition(int pos) {
        if (start == null) {
            System.out.println("List Empty!");
            return;
        }

        if (pos <= 1) {
            deleteBeg();
            return;
        }

        int count = 0;
        Node itr = start;
        while (itr != null) {
            count++;
            itr = itr.next;
        }

        if (pos >= count) {
            deleteEnd();
            return;
        }

        if (pos - 1 <= count - pos) {
            itr = start;
            for (int i = 1; i < pos && itr != null; i++) {
                itr = itr.next;
            }
        } else {
            itr = end;
            for (int i = count; i > pos && itr != null; i--) {
                itr = itr.prev;
            }
        }

        System.out.println("Deleted Employee: " + itr.data.name);
        itr.prev.next = itr.next;
        if (itr.next != null)
            itr.next.prev = itr.prev;
        else
            end = itr.prev;
    }

    public void displayForward() {
        if (start == null) {
            System.out.println("List Empty!");
            return;
        }

        System.out.println("\nEmployee List (Forward):");
        Node itr = start;
        while (itr != null) {
            System.out.println("ID: " + itr.data.id + ", Name: " + itr.data.name + ", Salary: " + itr.data.salary);
            itr = itr.next;
        }
    }

    public void displayReverse() {
        if (end == null) {
            System.out.println("List Empty!");
            return;
        }

        System.out.println("\nEmployee List (Reverse):");
        Node itr = end;
        while (itr != null) {
            System.out.println("ID: " + itr.data.id + ", Name: " + itr.data.name + ", Salary: " + itr.data.salary);
            itr = itr.prev;
        }
    }
}
