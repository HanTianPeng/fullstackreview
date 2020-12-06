package main

import (
	"fmt"
)

type name string

func nameTest() {
	var myname name = "conk彭"
	mynameBytes := []byte(myname)
	fmt.Println(len(mynameBytes))  // 7
}

type rewriteName string

func (rn rewriteName) len() int {
	return len(rn)
}

func rewriteNameTest() {
	var youname rewriteName = "conk彭"
	younameBytes := []byte(youname)
	fmt.Println(len(younameBytes))
	fmt.Println(youname.len())
}

// Person 结构体
type Person struct {
	string
	age int
}

func main() {
	nameTest()
	rewriteNameTest()
}