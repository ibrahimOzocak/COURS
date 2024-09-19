CC = gcc
OBJ = main.o liste.o
CFLAGS = -std=c11 -Wall -Wextra -Werror

main: $(OBJ)
	$(CC) $(CFLAGS) $^ -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

run: main
	./main

.PHONY: clean
clean:
	rm *.o main
