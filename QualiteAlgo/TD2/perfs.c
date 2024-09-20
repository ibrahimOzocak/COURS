#include <stdio.h>
#include "liste.h"
#include <time.h>

lst liste_premiers_entiers(int n){
    lst l = creerListe();
    for(int i=0; i<n; i++){
        ajouteEnTete(l, i);
    }
    return l;
}

int main(void){
    lst liste = liste_premiers_entiers(10);
    clock_t start = clock();
    clock_t end = clock();
    get(liste,5);
    double time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Time taken: %f\n", time);
}