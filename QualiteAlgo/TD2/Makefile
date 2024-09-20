CC = gcc
OBJ = main.o liste.o
PERFS_OBJ = perfs.o liste.o  # Object files for perfs
CFLAGS = -std=c11 -Wall -Wextra -Werror -Wconversion -g -O0

main: $(OBJ)
	$(CC) $(CFLAGS) $^ -o $@

# Rule to build the perfs executable
perfs: $(PERFS_OBJ)
	$(CC) $(CFLAGS) $^ -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# run: main
# 	./main

run: perfs
	./perfs

.PHONY: clean
clean:
	rm *.o main
