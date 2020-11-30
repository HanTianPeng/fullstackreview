package main

import (
	"io/ioutil"
	"fmt"
)


func readFile() {
	const file = "a.txt"
	contents, err := ioutil.ReadFile(file)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("%s\n", contents)
	}
}

func readFileV3(filename string) {
	con, err := ioutil.ReadFile(filename)
	// 判断
	if err != nil {
		panic(err)
	} else {
		fmt.Printf("%s\n", con)
	}

	if content, errMsg := ioutil.ReadFile(filename); errMsg != nil {
		panic(errMsg)
	} else {
		fmt.Printf("%s\n", content)
	}
}

func readFileV2() {
	const file = "a.txt"
	// if的条件里面可以赋值
	if contents, err := ioutil.ReadFile(file); err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("%s\n", contents)
	}
	// 注意: if的条件里赋值的变量作用域就在这个if语句里
	// fmt.Printf("%s\n", contents)
}

func switchFun(a, b int, op string) int {
	var result int
	// switch会自动break,除非使用fallthrough
	switch op {
	case "+":
		result = a + b
	case "-":
		result = a - b
	case "*":
		result = a * b
	case "/":
		result = a / b
	default:
		panic("unsupported operator: " + op)
	}
	fmt.Println(result)
	return result
}

func swithGrade(grade int) string {
	var result string
	// switch后可以没有表达式
	switch {
	case grade < 0 || grade > 100:
		panic(fmt.Sprintf("wrong score: %d", grade))
	case grade < 60:
		result = "C"
	case grade < 80:
		result = "B"
	case grade <= 100:
		result = "A"
	}
	return result
}

func main() {
	readFile()
	readFileV2()
	switchFun(10, 2, "+")
	switchFun(10, 2, "-")
	switchFun(10, 2, "*")
	switchFun(10, 2, "/")
	fmt.Println(
		swithGrade(0),
		swithGrade(59),
		swithGrade(60),
		swithGrade(79),
		swithGrade(80),
		swithGrade(99),
		swithGrade(100),
		// swithGrade(101),
	)
	fmt.Println("++++++++")
	readFileV3("a.txt")
}