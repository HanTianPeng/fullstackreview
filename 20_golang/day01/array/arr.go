package main

import (
	"fmt"
)

func arrDemo01() {
	var arr01 [5]int
	fmt.Println(arr01)
	// 初始化数组中{}元素个数,不能大于[]中的数字
	arr02 := [5]int {1, 2, 3, 4, 5}
	fmt.Println(arr02)
	// 如果忽略[]中的数字不设置大小,go语言会根据元素的大小来设置数组的大小
	arr03 := [...]int {2, 4, 6, 8, 10 ,12}
	fmt.Println(arr03)

	arr04 := [5]int {1: 4, 2: 10, 4: 18}
	fmt.Println(arr04)

	arr05 := [5] string {1: "hello", 4: "world"}
	fmt.Println(arr05)

	var arr06 [3][2]int
	fmt.Println(arr06)

	arr07 := [3][2]int {{1, 2}, {4, 5}, {7, 8}}
	fmt.Println(arr07)

	for i := 0; i < 3; i++ {
		for j := 0; j < 2; j++ {
			fmt.Printf("---二维数组- arr07[%d][%d]--%d\n", i, j, arr07[i][j])
		}
	}

	// 二维数组必须类型一致
	// arr08 := [3][2]int {{"hello", "world"}, {1, 2}, {3, 4}}

	for i := 0; i < len(arr02); i++ {
		fmt.Println("遍历--->", arr02[i])
	}

	for i := range arr02 {
		fmt.Println("range遍历--->", arr02[i])
	}

	for i, value := range arr02 {
		fmt.Println("range遍历key-value---->", i, value)
	}

	for _, value := range arr02 {
		fmt.Println("range遍历获取value--->", value)
	}
}

func arrChange01(arr [5]int) {
	arr[2] = 100
	for _, value := range arr {
		fmt.Println("改变数组--->", value)
	}
}

func arrChange02(arr *[5]int) {
	arr[2] = 200
	for _, value := range arr {
		fmt.Println("指针改变数组--->", value)
	}
}

func arrDemo02() {
	arr := [5]int {1, 2, 3, 4, 5}
	fmt.Println(arr)
	// 调用方法
	arrChange01(arr)
	fmt.Println(arr)
	// 调用方法
	arrChange02(&arr)
	fmt.Println(arr)
}

func main() {
	arrDemo01()
	// arrDemo02()
}