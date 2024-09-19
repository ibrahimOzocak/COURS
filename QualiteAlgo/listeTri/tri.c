#include <stdio.h>

void affiche_tableau(int tab[10])
{
    printf("[");
    for(int i = 0; i < 10; i++){
        printf("%d", tab[1]);
    }
    printf("]\n");
}

void tri_selection(int tab[10]){
    for(int i = 0; i<10; i++ ){
        int position_min = i;
        for (int j = i; j < 10; j++){
            printf("#");
            if (tab[j]<tab[position_min]){
                position_min = j;
            }
        }
        printf("x\n");
        int temp = tab[i];
        tab[i] = tab[position_min];
        tab[position_min] = temp;
    }
}

int main()
{
    int tableau[10] = {7,3,2,1,4,5,6,0,9,8};
    affiche_tableau(tableau);
    tri_selection(tableau);
    affiche_tableau(tableau);
    return 0;
}