package p2;

import p1.Node;

public class DoublyDLL {
    Node start, end;
    static int count = 0;

    public void insertBeg(int ele) {
        Node temp = new Node(ele);
        if (start == null) {
            start = end = temp;
        } else {
            temp.next = start;
            start.prev = temp;
            start = temp;
        }
        count++;
        System.out.println("----- Node added!(Beg) ----- ");
    }

    public void insertEnd(int ele) {
        Node temp = new Node(ele);
        if (start == null) {
            start = end = temp;
        } else {
            temp.prev = end;
            end.next = temp;
            end = temp;
        }
        count++;
        System.out.println("----- Node added!(End) ----- ");
    }

    public void insertAtPos(int ele, int pos) {
        if (pos < 1 || pos > count + 1) {
            System.out.println("Invalid position!");
            return;
        }

        if (pos == 1) {
            insertBeg(ele);
            return;
        }

        if (pos == count + 1) {
            insertEnd(ele);
            return;
        }

        Node temp = new Node(ele);
        Node itr;
        int tempCount;

        if (pos <= count / 2) {
            itr = start;
            tempCount = 1;
            while (tempCount < pos - 1) {
                itr = itr.next;
                tempCount++;
            }
        } else {
            itr = end;
            tempCount = count;
            while (tempCount > pos - 1) {
                itr = itr.prev;
                tempCount--;
            }
        }

        temp.prev = itr;
        temp.next = itr.next;
        itr.next.prev = temp;
        itr.next = temp;

        count++;
        System.out.println("----- Node added!(Pos " + pos + ") ----- ");
    }

    public void displayForward() {
        if (start == null) {
            System.out.println("----- No Nodes to display! -----");
        } else {
            Node itr = start;
            while (itr.next != null) {
                System.out.print(itr.getData() + " <--> ");
                itr = itr.next;
            }
            System.out.print(itr.getData() + " <--> NULL\n");
        }
    }

    public void displayBackward() {
        if (end == null) {
            System.out.println("----- No Nodes to display! -----");
        } else {
            Node itr = end;
            while (itr.prev != null) {
                System.out.print(itr.getData() + " <--> ");
                itr = itr.prev;
            }
            System.out.print(itr.getData() + " <--> NULL\n");
        }
    }
}
