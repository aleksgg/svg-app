UNAME := $(shell uname)
CC = gcc
CFLAGS = -Wall -std=c11 -g
LDFLAGS= -Lbin/
SOURCES = src/
INCLUDE = include/
BIN = bin/

#LOCAL_C_INCLUDES := $(LOCAL_PATH)/src

ifeq ($(UNAME), Linux)
	INC_PATH = /usr/include/libxml2
endif
ifeq ($(UNAME), Darwin)c
	INC_PATH = /usr/local/Cellar/libxml2/2.9.10/include/libxml2
endif


all: SVGParser

SVGParser: SVGParser.o $(BIN)liblist.so
	$(CC) $(CFLAGS) $(LDFLAGS) -o SVGParser SVGParser.o -llist -lxml2 -lm

SVGParser.o: $(SOURCES)SVGParser.c
	$(CC) $(CFLAGS) -I$(INCLUDE) -I$(INC_PATH) -c $(SOURCES)SVGParser.c

$(BIN)liblist.so: LinkedListAPI.o
	$(CC) -shared -o $(BIN)liblist.so LinkedListAPI.o

LinkedListAPI.o: $(SOURCES)LinkedListAPI.c $(INCLUDE)LinkedListAPI.h
	$(CC) $(CFLAGS) -I$(INCLUDE) -c -fpic $(SOURCES)LinkedListAPI.c

clean:
	rm -rf SVGParser *.o bin/*.so *.svg
