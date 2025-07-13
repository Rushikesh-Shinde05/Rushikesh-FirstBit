#include <stdio.h>
#include <string.h>

// Define a structure to hold book information
typedef struct Books {
    int BookId;               // Unique ID for each book
    char Bookname[50];        // Book name
    char authorName[50];      // Author name
    char Category[30];        // Book category
    int Price;                // Book price
    float Rating;             // Book rating
} Books;

// Function declarations
void storeArray(Books*, int*);
void displayArray(Books*, int);
int searchByBook_Id(Books*, int, int);
int searchByBook_Name(Books*, int, char*);
void deleteByBook_Id(Books*, int*, int);
void showBooksByAuthor(Books*, int, char*);
void showBooksByCategory(Books*, int, char*);
void updateBook(Books*, int, int);
void displayTopBooks(Books*, int);
void sortByPrice(Books*, int);
void sortByRating(Books*, int);

void main() {
    Books section1[100]; // Array to store books
    int count = 0;       // Current number of books
    int exit;            // Variable to control loop exit

    // Add some hardcoded books initially
    storeArray(section1, &count);

    // Main menu loop
    do {
        printf("\nMENU:\n");
        printf("1. Display All Books\n");
        printf("2. Search by Book ID\n");
        printf("3. Search by Book Name\n");
        printf("4. Delete by Book ID\n");
        printf("5. Show Books by Author\n");
        printf("6. Show Books by Category\n");
        printf("7. Update Book Price & Rating\n");
        printf("8. Display Top 3 Books by Price & Rating\n");
        printf("9. Sort by Price\n");
        printf("10. Sort by Rating\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        int choice;
        scanf("%d", &choice);

        if (choice == 1) {
            displayArray(section1, count);
        } else if (choice == 2) {
            int BookId;
            printf("Enter Book ID to search: ");
            scanf("%d", &BookId);
            int index = searchByBook_Id(section1, count, BookId);
            if (index != -1) {
                printf("Found: %s by %s (Category: %s) Price: %d Rating: %.lf\n",
                    section1[index].Bookname, section1[index].authorName,
                    section1[index].Category, section1[index].Price, section1[index].Rating);
            } else {
                printf("Book not found.\n");
            }
        } else if (choice == 3) {
            char Bookname[50];
            printf("Enter Book Name to search: ");
            scanf(" %[\n]s", Bookname); // Read string with spaces
            int index = searchByBook_Name(section1, count, Bookname);
            if (index != -1) {
                printf("Found: %s by %s (Category: %s) Price: %d Rating: %.lf\n",
                    section1[index].Bookname, section1[index].authorName,
                    section1[index].Category, section1[index].Price, section1[index].Rating);
            } else {
                printf("Book not found.\n");
            }
        } else if (choice == 4) {
            int BookId;
            printf("Enter Book ID to delete: ");
            scanf("%d", &BookId);
            deleteByBook_Id(section1, &count, BookId);
        } else if (choice == 5) {
            char author[50];
            printf("Enter Author Name: ");
            scanf(" %[\n]s", author);
            showBooksByAuthor(section1, count, author);
        } else if (choice == 6) {
            char category[30];
            printf("Enter Category: ");
            scanf(" %[\n]s", category);
            showBooksByCategory(section1, count, category);
        } else if (choice == 7) {
            int BookId;
            printf("Enter Book ID to update: ");
            scanf("%d", &BookId);
            updateBook(section1, count, BookId);
        } else if (choice == 8) {
            displayTopBooks(section1, count);
        } else if (choice == 9) {
            sortByPrice(section1, count);
            displayArray(section1, count);
        } else if (choice == 10) {
            sortByRating(section1, count);
            displayArray(section1, count);
        } else if (choice == 0) {
            break; // Exit the loop
        } else {
            printf("Invalid choice.\n");
        }

        printf("\nDo you want to continue? (1 = Yes / 0 = No): ");
        scanf("%d", &exit);

    } while (exit == 1);
}

// Hardcode initial books into array
void storeArray(Books* ptr, int* count) {
    strcpy(ptr[0].Bookname, "Rich Dad Poor Dad");
    ptr[0].BookId = 1;
    strcpy(ptr[0].authorName, "Robert T. Kiyosaki");
    strcpy(ptr[0].Category, "Personal Finance");
    ptr[0].Price = 1000;
    ptr[0].Rating = 4.5;

    strcpy(ptr[1].Bookname, "IT");
    ptr[1].BookId = 2;
    strcpy(ptr[1].authorName, "Stephen King");
    strcpy(ptr[1].Category, "Horror");
    ptr[1].Price = 500;
    ptr[1].Rating = 4.0;

    strcpy(ptr[2].Bookname, "Wings Of Fire");
    ptr[2].BookId = 3;
    strcpy(ptr[2].authorName, "A. P. J. Abdul Kalam");
    strcpy(ptr[2].Category, "Biography");
    ptr[2].Price = 700;
    ptr[2].Rating = 4.8;

    strcpy(ptr[3].Bookname, "Game Of Mind");
    ptr[3].BookId = 4;
    strcpy(ptr[3].authorName, "Devika Das");
    strcpy(ptr[3].Category, "Self Help");
    ptr[3].Price = 480;
    ptr[3].Rating = 4.1;

    strcpy(ptr[4].Bookname, "Forrest Gump");
    ptr[4].BookId = 5;
    strcpy(ptr[4].authorName, "Winston Groom");
    strcpy(ptr[4].Category, "Drama");
    ptr[4].Price = 1200;
    ptr[4].Rating = 4.4;

    *count = 5; // Set count to total books added
}

// Display all books in a table format
void displayArray(Books* ptr, int size) {
    printf("\n%-5s %-25s %-20s %-15s %-7s %-7s\n",
        "ID", "Book Name", "Author", "Category", "Price", "Rating");
    printf("--------------------------------------------------------------------------------------\n");
    for (int i = 0; i < size; i++) {
        printf("%-5d %-25s %-20s %-15s %-7d %-7.2f\n",
            ptr[i].BookId, ptr[i].Bookname, ptr[i].authorName,
            ptr[i].Category, ptr[i].Price, ptr[i].Rating);
    }
}

// Search book by ID and return index or -1
int searchByBook_Id(Books* ptr, int size, int BookId) {
    for (int i = 0; i < size; i++) {
        if (ptr[i].BookId == BookId)
            return i;
    }
    return -1;
}

// Search book by name and return index or -1
int searchByBook_Name(Books* ptr, int size, char* Bookname) {
    for (int i = 0; i < size; i++) {
        if (strcmp(ptr[i].Bookname, Bookname) == 0)
            return i;
    }
    return -1;
}

// Delete a book by ID
void deleteByBook_Id(Books* arr, int* count, int BookId) {
    int index = searchByBook_Id(arr, *count, BookId);
    if (index == -1) {
        printf("Book not found.\n");
    } else {
        // Shift all books left to overwrite the deleted book
        for (int i = index; i < *count - 1; i++)
            arr[i] = arr[i + 1];
        (*count)--; // Decrease count
        printf("Book deleted successfully.\n");
    }
}

// Show all books by given author name
void showBooksByAuthor(Books* arr, int size, char* author) {
    int found = 0;
    for (int i = 0; i < size; i++) {
        if (strcmp(arr[i].authorName, author) == 0) {
            printf("%s (ID: %d) - %s, Price: %d, Rating: %.lf\n",
                arr[i].Bookname, arr[i].BookId, arr[i].Category,
                arr[i].Price, arr[i].Rating);
            found = 1;
        }
    }
    if (!found)
        printf("No books found for this author.\n");
}

// Show all books by given category
void showBooksByCategory(Books* arr, int size, char* category) {
    int found = 0;
    for (int i = 0; i < size; i++) {
        if (strcmp(arr[i].Category, category) == 0) {
            printf("%s (ID: %d) - by %s, Price: %d, Rating: %.lf\n",
                arr[i].Bookname, arr[i].BookId, arr[i].authorName,
                arr[i].Price, arr[i].Rating);
            found = 1;
        }
    }
    if (!found)
        printf("No books found for this category.\n");
}

// Update price and rating for a book by ID
void updateBook(Books* arr, int size, int BookId) {
    int index = searchByBook_Id(arr, size, BookId);
    if (index == -1) {
        printf("Book not found.\n");
    } else {
        printf("Enter new price: ");
        scanf("%d", &arr[index].Price);
        printf("Enter new rating: ");
        scanf("%f", &arr[index].Rating);
        printf("Book updated successfully.\n");
    }
}

// Show top 3 books by price and by rating
void displayTopBooks(Books* arr, int size) {
    sortByPrice(arr, size);
    printf("\nTop 3 books by Price:\n");
    for (int i = 0; i < 3 && i < size; i++) {
        printf("%s - Price: %d\n", arr[i].Bookname, arr[i].Price);
    }

    sortByRating(arr, size);
    printf("\nTop 3 books by Rating:\n");
    for (int i = 0; i < 3 && i < size; i++) {
        printf("%s - Rating: %.lf\n", arr[i].Bookname, arr[i].Rating);
    }
}

// Sort books in descending order by price
void sortByPrice(Books* arr, int size) {
    for (int i = 0; i < size - 1; i++)
        for (int j = i + 1; j < size; j++)
            if (arr[i].Price < arr[j].Price) {
                Books temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
}

// Sort books in descending order by rating
void sortByRating(Books* arr, int size) {
    for (int i = 0; i < size - 1; i++)
        for (int j = i + 1; j < size; j++)
            if (arr[i].Rating < arr[j].Rating) {
                Books temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
}
