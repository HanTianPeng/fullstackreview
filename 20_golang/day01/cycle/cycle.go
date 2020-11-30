package main

import (
	"bufio"
	"os"
	"strconv"
	"fmt"
)

func cycleFor() {
	sum := 0
	// for的条件里不需要括号
	// for的条件里可以省略初始条件,结束条件,递增表达式
	for i := 1; i <= 100; i++ {
		sum += i;
	}
	fmt.Println(sum)
}

func convertToBin(num int) string {
	result := ""
	// for循环中省略初始条件,相当于while
	// /= 运算符: 相除后再赋值
	for ; num > 0; num /= 2 {
		lsb := num % 2
		result = strconv.Itoa(lsb) + result
	}
	return result
} 

func printFile(filename string) {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	scanner := bufio.NewScanner(file)
	// for循环中省略初始条件,递增条件,相当于while循环
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}

func endlessLoop() {
	// for循环中省略初始条件,递增条件,结束条件,相当于无限循环
	for {
		fmt.Println("hello go")
	}
}

func main() {
	cycleFor()
	fmt.Println(
		convertToBin(5),  // 101
		convertToBin(13),  // 1101
	)
	printFile("a.txt")
}

