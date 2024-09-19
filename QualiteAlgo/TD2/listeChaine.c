#include <stdio.h>
#include <stddef.h>

struct maillon
{
    int val; // on a des listes chainnées d entiers
    struct maillon * suivant;
    
};

int main(void){
    struct maillon maillon_trois = {3210, NULL};
    struct maillon maillon_deux  = {67890, &maillon_trois};
    struct maillon maillon_un  = {12345, &maillon_deux};

    struct maillon * liste = &maillon_un;
    struct maillon maillon_zero = { 17, &maillon_un};
    liste = &maillon_zero;

    //printf("le maillon un a pour valeur %d\n",maillon_un.val);
    //printf("le maillon deux a pour valeur %d\n",maillon_deux.val);
    //printf("le maillon deux a pour valeur %p\n",maillon_deux);
    //printf("le maillon suivant a pour valeur %d\n",maillon_un.suivant);
    //printf("la valeur du maillon suivant le maillon est un %d\n",maillon_un.suivant->val);
    //printf("la valeur du maillon suivant le maillon suivantle maillon zero est %d\n",maillon_un.suivant->suivant->val);

    printf('l element 0 de la liste a pour valeur %d\n', liste->val);
    printf('le maillon suivant le maillon est un %p\n', liste->suivant);
    printf('l element 1 est %d\n', liste->suivant->val);
    printf('l element 2 de la liste est %d\n', liste->suivant->suivant->val);
}
