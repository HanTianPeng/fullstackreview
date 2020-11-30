package main

import (
	"runtime"
	"reflect"
	"math"
	"fmt"
)

// 函数返回多个值可以取名字, 返回值类型写在最后面
func functionReturnMulti(a, b int) (quotient, remainder int) {
	// 取商 取模
	return a / b, a % b
} 

func switchFunc(a, b int, option string) (value int, err error) {
	// 定义变量: 注意事项: result还不能命名为value
	result, err := 0, nil
	// switch判断
	switch option {
	case "+":
		result = a + b
	case "-":
		result = a - b
	case "*":
		result = a * b
	case "/":
		result = a / b
	default:
		err = fmt.Errorf("unsupported operation : %s of a: %d, b: %d", option, a, b)
	}
	return result, err
}

func eval(a, b int, op string) (value int, err error) {
	result, err := 0, nil
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
		err = fmt.Errorf("unsupported operation: %s of a: %d, b: %d", op, a, b)
	}
	return result, err
}

// 函数式编程: 函数作为参数
func apply(op func(int, int) int, a, b int) int {
	p := reflect.ValueOf(op).Pointer()
	opName := runtime.FuncForPC(p).Name()
	fmt.Printf("Calling function %s with args " + "(%d, %d)", opName, a, b)
	return op(a, b)
}

// 可变参数列表
func sumArgs(nums ...int) int {
	sum := 0
	for i := range nums {
		sum += nums[i]
	}
	return sum
}

func pow(a, b int) int {
	return int(math.Pow(float64(a), float64(b)))
}


func main() {
	println(functionReturnMulti(2, 10))
	quotient, _ := functionReturnMulti(10, 8)
	fmt.Println(quotient)
	fmt.Println(eval(10, 2, "+"))
	fmt.Println(eval(10, 2, "-"))
	fmt.Println(eval(10, 2, "*"))
	fmt.Println(eval(10, 2, "/"))
	fmt.Println(eval(10, 2, "&"))

	fmt.Println(apply(pow, 3, 4))

	fmt.Println(sumArgs(1, 2, 3, 4, 5))
}

