package main

import (
	"fmt"
)

func mapDemo01() {
	map01 := map[string]string {
		"hello": "go",
		"name": "python",
		"today": "2020",
	}
	fmt.Println(map01)

	map02 := make(map[string]int)
	fmt.Println(map02)  // empty map

	var map03 map[string]int
	fmt.Println(map03)  // nil

	for key, value := range map01 {
		fmt.Println(key, value)  // hello go
	}

	for key := range map01 {
		fmt.Println(key)
	}

	for _, value := range map01 {
		fmt.Println(value)
	}

	courseName, isHas := map01["hello"]
	fmt.Println(courseName, isHas)  // go, true
	name, isHas := map01["good"]
	fmt.Println(name, isHas)  //  false

	if age, isHas := map01["age"]; isHas {
		fmt.Println("存在--->", age)
	} else {
		fmt.Println("不存在")
	}

	delete(map01, "today")
	fmt.Println(map01)
}

func getLongestStr(s string) int {
	strMap := make(map[byte]int)
	start := 0
	max := 0 
	for i, v := range []byte(s) {
		index, isOk := strMap[v]
		
		if isOk && index >= start {
			start = index + 1
		}

		fmt.Println(i, v, isOk, start, max)
		if i - start + 1 > max {
			max = i - start + 1
		}
		strMap[v] = i
	}
	return max
}

func strTravelsal() {
	str01 := "hello"
	for i, v := range []byte(str01) {
		fmt.Println(i, v)
	}
}

func main() {
	// mapDemo01()
	// strTravelsal()
	max := getLongestStr("abba")
	fmt.Println(max)
}