//Q10 .Write a C program to input marks of five subjects, find the total marks, and calculate the percentage.
void main()
{
int m1 =80 , m2 =70 , m3 =60 , m4 =58 , m5 =95;
double totalMarks,percentage ;
totalMarks = m1+m2+m3+m4+m5;
percentage = (totalMarks/500.0) *100;
printf("percentage will be %f",percentage);
}