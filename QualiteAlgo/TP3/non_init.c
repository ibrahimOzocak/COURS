#include <stdio.h>

void f1(){
    int code_pin = 1234;
    printf("Code pin : %d\n", code_pin);
}

void f2(){
    int x;
    printf("Valeur de x : %d\n", x);
}

int main(){
    f1();
    f2();
}