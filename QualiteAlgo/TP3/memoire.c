#include <stdio.h>

int main(){
    int n = 2, m=2;
    int tab[n][m];
    printf("# tab V1\n\n");
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++)
            printf("%p\n",&tab[i][j]);
    }
    int **tab2 = malloc(sizeof(int *)*n);
    for(int i=0;i<n;i++){
        tab2[i] = malloc(sizeof(int)*m);
    }
    printf("\n# tab V2\n\n");
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++)
            printf("%p\n",&tab2[i][j]);
    }
}

float moyenne_v1(int **mat, int n) {
    int i, j, total = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            total += mat[i][j];
        }
    }
    return (float) total / (n * n);
}

float moyenne_v2(int **mat, int n) {
    int i, j, total = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
        total += mat[j][i];
        }
    }
    return (float) total / (n * n);
}