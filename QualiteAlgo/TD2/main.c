#include <stdio.h>
#include "liste.h"

int main() {
    lst liste = creerListe();
    printf("Liste créée à l'adresse %p\n", liste);
    printf("Ma liste a %d éléments\n", liste->nbElem);
    printf("Le premier maillon de ma liste est à l'adresse %p\n", liste->debut);
    ajouteEnTete(liste, 17);
    ajouteEnTete(liste, 42);
    printf("Ma liste contient %d elements\n", liste->nbElem);
    printf("Son premier element est %d\n", liste->debut->val);
    printf("Le deuxieme element est %d\n", liste->debut->suivant->val);
    printf("Le premier element est %d\n", get(liste, 0));
    printf("Le deuxieme element est %d\n", get(liste, 1));
    supprimerListe(liste);
    
}