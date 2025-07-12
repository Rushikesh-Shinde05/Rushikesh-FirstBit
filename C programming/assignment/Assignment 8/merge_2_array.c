//Q8 merge 2 array
#include<stdio.h>
int merge(int *mrg);
int main() {
	int mrg;
	merge(&mrg);
	//return 0;
}
int merge(int *mrg) {
	int arr[] = {1,2,3,4,5};
	int brr[] = {6,7,8,9,10};
	int crr[10] = {};
	for(int i = 0; i < arr[i]; i++) {
		crr[i] = arr[i];
	}

	for(int i = 0; i < brr[i]; i++) {
		crr[i+5] = brr[i];
	}
	for(int i = 0; i< 10; i++) {
		printf("%d\n",crr[i]);
	}
}