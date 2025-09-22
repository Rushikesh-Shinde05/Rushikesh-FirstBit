
class Book {
  String Title;
  String Auther;
  double Price;
  Book(String title, String auther, double price) {
	super();
	Title = title;
	Auther = auther;
	Price = price;
  }
  String getTitle() {
	return Title;
  }
  void setTitle(String title) {
	Title = title;
  }
  String getAuther() {
	return Auther;
  }
  void setAuther(String auther) {
	Auther = auther;
  }
  double getPrice() {
	return Price;
  }
  void setPrice(double price) {
	Price = price;
  }
  void display() {
	  
	  System.out.println("title of book:"+Title);
	  System.out.println("author  of book  :" +Auther);
	  System.out.println("Price of Book:" +Price);
  }
}//book class ends here

class Ebook extends Book 
{
	double FileSizeMb;

	Ebook(String title, String auther, double price, double fileSizeMb) {
		super(title, auther, price);
		FileSizeMb = fileSizeMb;
	}

	double getFileSizeMb() {
		return FileSizeMb;
	}

	void setFileSizeMb(double fileSizeMb) {
		FileSizeMb = fileSizeMb;
	}
	void display() {
		super.display();
		
		System.out.println("File Size of Book In MB:" +FileSizeMb);
	}
}//EBook class ends here

class PrintedBook extends Book 
{
	int Pages;

	PrintedBook(String title, String auther, double price, int pages) {
		super(title, auther, price);
		Pages = pages;
	}

	int getPages() {
		return Pages;
	}

	void setPages(int pages) {
		Pages = pages;
	}
	
	void display() {
		super.display();
		System.out.println("Pages In Book:" +Pages);
	}
}//PrintedBook class ends here

class Test {
	public static void main (String [] args) {
		Book b1 = new Book("IT", "Stephen King", 500);
		b1.display();
		
		Book b2 = new Ebook("Wings Of Fire", "A.P.J Abdual Kalam", 500, 100);
		b2.display();
		
		Book b3 = new PrintedBook("Shyamchi Aai", "Sane Guruji", 500, 150);
		b3.display();
	}
}
