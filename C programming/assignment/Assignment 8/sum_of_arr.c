//Q3. Find sum of all numbers.
#include<stdio.h>
int summ();
int main() {
	int sm;
	sm = summ();
	printf("%d",sm);
	return 0;
}
int summ() {
	int arr[] = {1,2,3,4,5};
	int sum =0;
	for(int i =0; i<5; i++) {
		sum+=arr[i];
	}
	return sum;

}

