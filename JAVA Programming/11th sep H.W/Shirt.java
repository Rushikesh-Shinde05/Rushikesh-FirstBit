class Shirt
{
	int sid;
	String brand;
	String type;
	static double price;
	static String size;
	
	Shirt()
	{
		this.sid=101;
		this.brand="Raymond";
		this.type="formal";
		this.price=10000;
		this.size="small";
	}
	Shirt(int i,String b,String t,double p,String s)
	{
		this.sid=i;
		this.brand=b;
		this.type=t;
		this.price=p;
		this.size=s;
	}
	void setId(int id)
	{
		this.sid=id;
	}
	void setBrand(String brand)
	{
		this.brand=brand;
	}
	void setType(String t)
	{
		this.type=t;
	}
	void setPrice(double p)
	{
		this.price=p;
	}
	void setSize(String s)
	{
		this.size=s;
	}
	int getId()
	{
		return sid;
	}
	String getBrand()
	{
		return brand;
	}
	String getType()
	{
		return type;
	}
	double getPrice()
	{
		return price;
	}
	String getSize()
	{
		return size;
	}

   static  double calculatePrice() 
{
        switch (size) 
{
            case "small":
                return price;                
            case "medium":
                return price * 1.10;         
            case "large":
                return price * 1.20;         
            case "x-large":
                return price * 1.30;          
            default:
                System.out.println("Invalid size, defaulting to Small.");
                return price;
        }
    }

    void display()
 {
        System.out.println("Shirt ID: " + sid);
        System.out.println("Shirt Brand: " + brand);
        System.out.println("Shirt Type: " + type);
        System.out.println("Base Price: " + price);
        System.out.println("Shirt Size: " + size);
        System.out.println("Final Price: " + calculatePrice());
        System.out.println("-----------------------------");
    }
}
class Test
{
	public static void main(String [] a)
	{
		Shirt s=new Shirt();
		s.display();
		Shirt s1 = new Shirt(201, "Arrow", "Formal", 1000, "large");
		s1.display();
	}
}
	