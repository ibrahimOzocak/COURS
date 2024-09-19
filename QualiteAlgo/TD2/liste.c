#include <stddef.h>
#include "liste.h"
#include <stdlib.h>
#include <stdio.h>

lst creerListe(){
    lst l = malloc(sizeof(struct liste));
    l->nbElem = 0;
    l->debut = NULL;
    return l;
}

void supprimerListe(lst l){
    if(l->nbElem == 0){
        free(l);
    }
    else{
        printf("SAIT PAS FAIRE");
    }
    
}

void ajouteEnTete(lst l, int x){
    ml nouveauMaillon = malloc(sizeof(struct maillon));
    nouveauMaillon->val = x;
    nouveauMaillon->suivant = l->debut;
    l->debut=nouveauMaillon;
    l->nbElem++;
}

int get(lst l, int ind){
    ml maillonActuel = l->debut;
    for(int i=0; i<ind; i++){
        maillonActuel = maillonActuel->suivant;
    }
    return maillonActuel->val;
}