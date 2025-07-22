//Q10. Soting array using function
#include<stdio.h>
int sort(int *element);
void main()
{
	int element;
	sort(&element);

}

int sort(int *element)
{
		int arr[] = {8, 4, 7, 5, 1,};
    int n = sizeof(arr) / sizeof(arr[0]);
    int i, j, temp;

    // Basic sorting logic
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                // Swap arr[i] and arr[j]
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    // Print sorted array
    printf("Sorted array: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}