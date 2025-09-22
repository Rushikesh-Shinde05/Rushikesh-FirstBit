
class Shirt {
	int sid;
	String brand;
	
	 double price;
	 String size;
	Shirt(int sid, String brand) {
		super();
		this.sid = sid;
		this.brand = brand;
		
	}

	
	int getSid() {
		return sid;
	}


	void setSid(int sid) {
		this.sid = sid;
	}


	String getBrand() {
		return brand;
	}


	void setBrand(String brand) {
		this.brand = brand;
	}


	double getPrice() {
		return price;
	}


	void setPrice(double price) {
		this.price = price;
	}


	String getSize() {
		return size;
	}


	void setSize(String size) {
		this.size = size;
	}


	void display () {
		super.display();

		System.out.println("Shirt id :" + sid);
		System.out.println("Brand :" + brand);
	
		System.out.println("Price :" +price);
		System.out.println("Size:"+size);
	}
	
} //Shirt class ends here

class Formals extends Shirt
{
	
	String CuffType;
	String HasPocket;
	String Pattern;
	Formals(int sid, String brand, String cuffType, String hasPocket, String pattern) {
		super(sid, brand);
	
		CuffType = cuffType;
		HasPocket = hasPocket;
		Pattern = pattern;
	}
	
	
	
	String getCuffType() {
		return CuffType;
	}
	void setCuffType(String cuffType) {
		CuffType = cuffType;
	}
	String getHasPocket() {
		return HasPocket;
	}
	void setHasPocket(String hasPocket) {
		HasPocket = hasPocket;
	}
	String getPattern() {
		return Pattern;
	}
	void setPattern(String pattern) {
		Pattern = pattern;
	}
	public void display() {
		super.display();

		System.out.println("Cuffe Type:"+CuffType);
		System.out.println("Has Pocket :"+HasPocket);
		System.out.println("Pattern:" +Pattern);
		
	}
} //Formal Shirt class ends here

class PoloShirts extends Shirt
{
	String CollerStyle;

	PoloShirts(int sid, String brand,  String collerStyle) {
		super(sid, brand);
		CollerStyle = collerStyle;
	}

	String getCollerStyle() {
		return CollerStyle;
	}

	void setCollerStyle(String collerStyle) {
		CollerStyle = collerStyle;
	}
	public void display() {
		super.display();
		System.out.println("Coller Type:"+CollerStyle);
	}
	
}


class Test{
	public static void main (String[] args) {
		Shirt s1 = new Shirt(01,"Luis Vitton");
		s1.display();
		Formals f1 = new Formals(02, "Allen Solly", "CuffTy", "Yes", "Line");
		f1.display();
		
		PoloShirts ps1 = new PoloShirts(03, "POLO", "Knitted");
		ps1.display();

	
		
		
	}
}
	

