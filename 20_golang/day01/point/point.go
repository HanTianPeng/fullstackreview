package main

import (
	"fmt"
)


func swap(a, b *int) {
	*a, *b = *b, *a
	// *b, *a = *a, *b
}

// 两个变量交换
func swapBetter(a, b int) (valueA, valueB int) {
	return b, a
}

func swapDemo01() {
	a, b := 3, 4
	fmt.Println(a, b)
	swap(&a, &b)
	fmt.Println(a, b)
}

func swapDemo02() {
	a, b := 3, 4
	fmt.Println(a, b)
	a, b = swapBetter(a, b)
	fmt.Println(a, b)
}

func pointerDemo01() {
	a := 3
	fmt.Printf("value a: %d, pointer value a: %x\n", a, &a)

	// 申明指针变量
	var ap *int
	fmt.Printf("%x\n", ap)  // 空指针, 0
	if ap != nil {
		fmt.Println("ap is not empty pointer")
	} else {
		fmt.Println("ap is empty pointer")
	}
	ap = &a
	if ap != nil {
		fmt.Println("ap is not empty pointer")
	} else {
		fmt.Println("ap is empty pointer")
	}
	fmt.Printf("point value ap: %x, value ap: %d\n", ap, *ap)
}

func pointerDemo02() {
	arr01 := [3]int {1, 2, 3}
	fmt.Printf("arr %v\n", arr01)
	for index, value := range arr01 {
		fmt.Printf("arr[%d], value %d, point-value %x\n", index, value, &value)
	}

	var parr01 [3]*int
	fmt.Printf("parr01 point-value: %x\n", parr01)

	// parr01 = &arr01
	// fmt.Printf("parr01 point-value: %x, value : %v\n", &parr01, parr01)

	var parr02 [3]*int
	for index, value := range arr01 {
		fmt.Printf("%v, %x\n", value, &value)
		parr02[index] = &value
	}
	fmt.Printf("parr02 %v\n", parr02)
}

func pointerDemo03() {
	arr01 := [5]int {1, 2, 3, 4, 5}
	fmt.Printf("%v, %x \n", arr01, &arr01)
}

func main() {
	// swapDemo01()

	// swapDemo02()

	// pointerDemo01()

	// pointerDemo02()

	pointerDemo03()
}