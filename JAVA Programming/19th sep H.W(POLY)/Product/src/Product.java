
class Product {
     int Id;
     String Name;
     double Price;
	 Product(int id, String name, double price) {
		super();
		Id = id;
		Name = name;
		Price = price;
	 }
	 int getId() {
		 return Id;
	 }
	 void setId(int id) {
		 Id = id;
	 }
	 String getName() {
		 return Name;
	 }
	 void setName(String name) {
		 Name = name;
	 }
	 double getPrice() {
		 return Price;
	 }
	 void setPrice(double price) {
		 Price = price;
	 }
     void display() {
    	 System.out.println("ID of Product :" +Id);
    	 System.out.println("Name of Product :" +Name);
    	 System.out.println("Price of Product :"+Price);
     }
}// product class ends here

class ElectronicProduct  extends Product 
{
     	double warrantyYears;
     	String Brand;
		ElectronicProduct(int id, String name, double price, double warrantyYears, String brand) {
			super(id, name, price);
			this.warrantyYears = warrantyYears;
			Brand = brand;
		}
		double getWarrantyYears() {
			return warrantyYears;
		}
		void setWarrantyYears(double warrantyYears) {
			this.warrantyYears = warrantyYears;
		}
		String getBrand() {
			return Brand;
		}
		void setBrand(String brand) {
			Brand = brand;
		}
     	void display() {
     		super.display();
     		
     		System.out.println("Warrenty of Product :" +warrantyYears);
     		System.out.println("Product Brand:" +Brand);
     	}
     	
}// ElectronicProduct class ends here

class ClothingProduct  extends Product 
{
	double size;
	String Fabric;
	ClothingProduct(int id, String name, double price, double size, String fabric) {
		super(id, name, price);
		this.size = size;
		Fabric = fabric;
	}
	double getSize() {
		return size;
	}
	void setSize(double size) {
		this.size = size;
	}
	String getFabric() {
		return Fabric;
	}
	void setFabric(String fabric) {
		Fabric = fabric;
	}
	void display() {
		super.display();
		
		System.out.println("Size of Cloth:" +size);
		System.out.println("Fabric of Cloth:" +Fabric);
	}
} //ClothingProduct class ends here

class FoodProduct   extends Product
{
	double expiryDate ;
	String isVegetarian;
	FoodProduct(int id, String name, double price, double expiryDate, String isVegetarian) {
		super(id, name, price);
		this.expiryDate = expiryDate;
		this.isVegetarian = isVegetarian;
	}
	double getExpiryDate() {
		return expiryDate;
	}
	void setExpiryDate(double expiryDate) {
		this.expiryDate = expiryDate;
	}
	String getIsVegetarian() {
		return isVegetarian;
	}
	void setIsVegetarian(String isVegetarian) {
		this.isVegetarian = isVegetarian;
	}
	void display() {
		super.display();
		
		System.out.println("Expiry Date:" +expiryDate);
		System.out.println("Is Vegetarian:" +isVegetarian);
	}
	
}// Food Product class ends here


class Test{
   public static void main(String [] args) {
	   Product p1 = new Product(1, "Anything", 100);
	   p1.display();
	   
	   Product p2 = new  ElectronicProduct(2, "MObile", 200000, 1, "Samsung");
		   p2.display();
		              
	   Product p3 = new ClothingProduct(3, "Formal-Shirt", 5000, 6, "Lois Vitton");
	   p3.display();
	   
	   Product p4 = new FoodProduct(4, "Yogurt", 70, 1, "Amul");
	   p4.display();
   }
}
