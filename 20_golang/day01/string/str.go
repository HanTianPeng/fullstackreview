package main

import (
	"unicode/utf8"
	"fmt"
)

func strDemo01() {
	str01 := "go最爱!"
	// 获取字节的长度: 9
	fmt.Println(len(str01)) 

	// 获取字节: [103 111 230 156 128 231 136 177 33]
	fmt.Println([]byte(str01))

	// 遍历
	for index, value := range str01 {
		// (0, 67) (1, 6f) (2, 6700) (5, 7231) (8, 21) 
		fmt.Printf("(%d, %x) ", index, value)
	}

	fmt.Println()

	for _, value := range []byte(str01) {
		// 67 6f e6 9c 80 e7 88 b1 21
		fmt.Printf("%x ", value)
	}
	fmt.Println()

	// 5
	fmt.Println("rune count: ", utf8.RuneCountInString(str01))

	bytes := []byte(str01)
	for len(bytes) > 0 {
		ch, size := utf8.DecodeRune(bytes)
		bytes = bytes[size:]
		// (1, g) (1, o) (3, 最) (3, 爱) (1, !)
		fmt.Printf("(%d, %c) ", size, ch)
	}
	fmt.Println()

	for index, value := range []rune(str01) {
		// (0, g) (1, o) (2, 最) (3, 爱) (4, !) 
		fmt.Printf("(%d, %c) ", index, value)
	}
	fmt.Println()
}

func main() {
	strDemo01()
}