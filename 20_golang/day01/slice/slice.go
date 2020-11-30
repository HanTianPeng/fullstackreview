package main

import (
	"fmt"
)

func updateSliceDemo01(sliceVariable []int) {
	sliceVariable[0] = 1000
}

// slice可以向后扩展,但不允许向前扩展, slice[i]不可以向后扩展
func resliceDemo01(sliceVariable []int) {
	fmt.Println("reslice之前--->", sliceVariable)
	reslice01 := sliceVariable[2: ]
	fmt.Println("reslice之后[2: ]--->", reslice01)
	reslice02 := reslice01[1: 4]
	fmt.Println("reslice再次之后[1: 4]--->", reslice02)
	fmt.Printf("--%v---%d---%d\n", reslice02, len(reslice02), cap(reslice02))
}

func printSlice(sli []int) {
	fmt.Printf("value=%v, len=%d, cap=%d\n", sli, len(sli), cap(sli))
}

func createSliceDemo01() {
	var sli01 []int
	for i := 0; i < 100; i++ {
		// printSlice(sli01)
		sli01 = append(sli01, 2 * i + 1)
	}
	fmt.Println(sli01)  // [1, 3, 5, 7, 9, 11]

	sli02 := []int {2, 4, 6, 8}
	printSlice(sli02)  // value=[2, 4, 6, 8], len=4, cap=4

	sli03 := make([]int, 2)
	printSlice(sli03)  // value=[0, 0], len=2, cap=2

	sli04 := make([]int, 2, 4)
	printSlice(sli04)  // value=[0, 0], len=2, cap=4
}

func copySliceDemo01() {
	sli01 := []int {2, 4, 6, 8}
	sli02 := make([]int, 6)
	printSlice(sli02)  // value=[0, 0, 0, 0, 0, 0], len=6, cap=6
	copy(sli02, sli01)
	printSlice(sli02)  // value=[2, 4, 6, 8, 0, 0], len=6, cap=6
	sli02 = append(sli02[:3], sli02[4:]...)
	printSlice(sli02)  // value=[2, 4, 6, 0, 0], len=5, cap=6
}

// slice本身没有数据,是对底层array的一个view
func sliceDemo01() {
	arr := [9]int {0, 1, 2, 3, 4, 5, 6, 7, 8}
	slice01 := arr[2: 6]
	slice02 := arr[2: ]
	slice03 := arr[: 6]
	slice04 := arr[ : ]
	fmt.Println(slice01, slice02, slice03, slice04)

	// 更新
	updateSliceDemo01(slice01)
	fmt.Println("更新后的slice01--->", slice01)
	fmt.Println("更新后的arr------->", arr)

	// reslice
	resliceDemo01(slice01)
}

func main() {
	// sliceDemo01()

	// createSliceDemo01()

	copySliceDemo01()
}

