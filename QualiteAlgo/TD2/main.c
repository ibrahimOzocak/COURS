#define _POSIX_C_SOURCE 199309L
#include <stdio.h>
#include "liste.h"
#include <time.h>

int main() {
    lst liste = creerListe();
    struct timespec ts_debut;
    struct timespec ts_fin;

    // Start measuring time
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts_debut);

    // Some operations on your list
    ajouteEnTete(liste, 17);
    ajouteEnTete(liste, 42);

    // Stop measuring time
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts_fin);

    // Calculate time in seconds (including nanoseconds)
    double temps_ns = (double)ts_fin.tv_nsec - (double)ts_debut.tv_nsec ;

    printf("Liste créée à l'adresse %p\n", liste);
    printf("Ma liste a %d éléments\n", liste->nbElem);
    printf("Le premier maillon de ma liste est à l'adresse %p\n", liste->debut);
    printf("Ma liste contient %d elements\n", liste->nbElem);
    printf("Son premier element est %d\n", liste->debut->val);
    printf("Le deuxieme element est %d\n", liste->debut->suivant->val);
    printf("Le premier element est %d, TEMPS D EXECUTION : %f ns\n", get(liste, 0), temps_ns);
    printf("Le deuxieme element est %d, TEMPS D EXECUTION : %f ns\n", get(liste, 1), temps_ns);

    supprimerListe(liste);
    
    return 0;
}
