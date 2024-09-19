#ifndef LISTE_H
#define LISTE_H

/**
BUT3 Info Orleans R504 - fichier d'en-tête pour les listes chainées
*/

/**
Un maillon contient une valeur entière et un pointer vers un autre maillon
*/
struct maillon {
    int val;
    struct maillon *suivant;
};

/**
Une liste est constitué de son premier maillon (potentiellement vide) et
du nombre d'élément contenus dans la liste.
*/
struct liste {
    struct maillon * debut;
    int nbElem;
};

typedef struct maillon* ml ;
typedef struct liste* lst;

lst creerListe();
void ajouterEnTete(lst l, int x);
void inserer(lst l, int val, int i);
int supprimerEnTete(lst l);
int supprimer(lst l, int i);
void afficherListe(lst l);
void supprimerListe(lst l);
void ajouteEnTete(lst l, int x);
int get(lst l, int ind);

#endif