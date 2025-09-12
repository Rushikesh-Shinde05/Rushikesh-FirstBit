import java.util.Scanner;
class Car
{
	int model;
	double price;
	String brand;
	
	void setModel(int model)
	{
		this.model=model;
	}
	
	void setPrice(double price)
	{
		this.price=price;	
	}
	
	void setBrand(String brand)
	{
		this.brand=brand;
	}
	int getModel()
	{
		return this.model;
	}
		double getPrice()
	{
		return this.price;
	}
	String getBrand()
	{
		return this.brand;
	}

	void display()
	{
	
		System.out.println("Model:"+this.model);
		System.out.println("Price:"+this.price);
		System.out.println("Brand:"+this.brand);
	}
	Car()
	{
		this.model=545;	
		this.price=5024.20;
		this.brand="tata";
		System.out.println("Default call:");
	}
	Car(int m,double p, String b)
	{
		this.model=m;	
		this.price=p;
		this.brand=b;
		System.out.println("para call:");
	}


}
class Test
{
	public static void main(String []a)
	{
		Scanner sc=new Scanner(System.in);
		
		System.out.println("Enter a Model");
		int m=sc.nextInt();

		System.out.println("Enter a price");
		double p=sc.nextDouble();	
		sc.nextLine();

		System.out.println("Enter a brand");
		String i=sc.nextLine();
	
		Car d1=new Car();
		d1.display();
		Car c2=new Car(m,p,i);
		c2.display();
	}
}	
