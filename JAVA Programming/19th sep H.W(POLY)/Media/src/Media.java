
class Media {
    String title;
    int duration;
	Media(String title, int duration) {
		super();
		this.title = title;
		this.duration = duration;
	}
	String getTitle() {
		return title;
	}
	void setTitle(String title) {
		this.title = title;
	}
	int getDuration() {
		return duration;
	}
	void setDuration(int duration) {
		this.duration = duration;
	}
    void display() {
    	System.out.println("Title of media:" +title);
    	System.out.println("Duratiion of media:"+duration);
    }
}//media class ends here

class Movie  extends Media {
	String diractor;
	String genre;
	Movie(String title, int duration, String diractor, String genre) {
		super(title, duration);
		this.diractor = diractor;
		this.genre = genre;
	}
	String getDiractor() {
		return diractor;
	}
	void setDiractor(String diractor) {
		this.diractor = diractor;
	}
	String getGenre() {
		return genre;
	}
	void setGenre(String genre) {
		this.genre = genre;
	}
	void display() {
		super.display();
		
		System.out.println("Name of diractor:" +diractor);
		System.out.println("Genre:" +genre);
	}
}//Movie class ends here

class Song extends Media{
	String artist;
	String album;
	Song(String title, int duration, String artist, String album) {
		super(title, duration);
		this.artist = artist;
		this.album = album;
	}
	String getArtist() {
		return artist;
	}
	void setArtist(String artist) {
		this.artist = artist;
	}
	String getAlbum() {
		return album;
	}
	void setAlbum(String album) {
		this.album = album;
	}
	void display(){
		super.display();
		System.out.println("Name of Artist:" +artist);
		System.out.println("Name of Album:" +album);
	}
}//song class ends here

class Test {
	public static void main(String[] args) {
		Media m1 = new Media("Movie", 2);
		Media m2 = new Movie("Movie", 2, "Christopher Nolan", "sci-fi");
		Media m3 = new Song("Song", 3, "Weekend", "Blinding-light");
		
		m1.display();
		m2.display();
		m3.display();
	}
}
