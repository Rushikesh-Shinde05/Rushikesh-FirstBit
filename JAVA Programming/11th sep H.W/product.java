class Product
 {
    int pid;
    String name;
    double costprice;
    int quantity;
    static int discount;

    static 
	{
        discount = 10;      
	}

    Product() 
{
        System.out.println("Default constructor:");
        this.pid = 101;
        this.name = "laptop";
        this.costprice = 5000.45;
        this.quantity = 2;
    }

    Product(int i, String n, double c, int q)
 {
        System.out.println("Parameterized constructor:");
        this.pid = i;
        this.name = n;
        this.costprice = c;
        this.quantity = q;
    }

    void setDiscount(int d) 
	{
        discount = d;  
    	}

    void display() 
{
        double res = costprice * quantity;
        double d = res * discount / 100;
        double finalPrice = res - d;

        System.out.println("Product Name: " + name);
        System.out.println("Total Price: " + res);
        System.out.println("Discount (" + discount + "%): " + d);
        System.out.println("Final Selling Price: " + finalPrice+"\n");
    }
}

class Test {
    public static void main(String[] a) 
{
        Product p = new Product();
        p.display();

        
        Product p2 = new Product(102, "Mobile", 2000.0, 3);
        p2.setDiscount(15); // change discount
        p2.display();
    }
}
