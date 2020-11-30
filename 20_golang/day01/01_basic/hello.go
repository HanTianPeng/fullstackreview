package main

import (
	"math"
	"fmt"
)

var (
    milesson = "课程"
    id = 100
)


func variable() {
    var name string
    var age int
    fmt.Printf("%q\n %d\n", name, age)
} 

func variableInit() {
    var sex, phone string = "男", "18170872531"
    var age int = 18
    fmt.Println(sex, phone, age)
}

func variableTypeDeduction() {
    var sex, name, age, isMe = "男", "田田", 18, true
    fmt.Println(name, sex, age, isMe)
}
 
func variableShorter() {
    sex, name, age, isMe := "男", "田田", 18, true
    fmt.Println(name, sex, age, isMe)
}

func triangle() {
    var a, b int = 3, 4
    var c int
    c = int(math.Sqrt(float64(a * a + b * b)))
    fmt.Println(c)
}

func variableConst() {
    // const 一定要赋值
    const filename string = "a.txt"
    const a, b, m = 3, 4, "hello"
    var c int 
    // 注意: 这里面就不需要进行强制类型转换, 因为a, b为常量,所以在math.Sqrt函数中能自动识别a,b的数据类型为float
    c = int(math.Sqrt(a * a + b * b))
    fmt.Println(filename, c, m)
}

func constDemo() {
    const a, b int = 3, 4
    var c int 
    c = int(math.Sqrt(float64(a * a) + float64(b * b)))
    fmt.Println(c)
}

// 数组不可动态变化
func variableList() {
    var arrFirst [5] int
    fmt.Println(arrFirst)

    var arrS = [5] int {1, 2, 3, 4, 5}
    fmt.Println(arrS)

    arrT := [5] int {1, 2, 3, 4, 5}
    fmt.Println(arrT)

    arrF := [...] int {1, 2, 3, 4, 5, 6, 7}
    fmt.Println(arrF)

    arrFi := [5] int {0:3, 1:5, 4: 10}
    fmt.Println(arrFi)

    arrSi := [5] string {0: "hello", 3: "world", 4: "go"}
    fmt.Println(arrSi)

    arrSe := [3][5] int {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, {11, 12, 13, 14, 15}}
    fmt.Println(arrSe)
}


func variableEnums() {
    const (
        chinese = iota
        math
        english
    )
    fmt.Println(chinese, math, english)  // 0, 1, 2

    const (
        b = 1 << (10 * iota)
        kb
        mb
        gb
        tb
        pb
    )
    fmt.Println(b, kb, mb, gb, tb, pb)
}



// 省略val,注意:=左侧如果没有申明新的变量,就会产生编译错误
func variableDemo01() {
    var intVal int
    // intVal := 10  // no new variables on left side of :=
    fmt.Println(intVal)
}

// 省略val,只要:=左侧有申明新的变量,就不会产生编译错误
func variableDemo02() {
    var intVal int
    fmt.Println(intVal)
    intVal, intVal1 := 1, 2
    fmt.Println(intVal, intVal1)
}

// 省略val,只要:=左侧有申明新的变量,就不会产生编译错误
func variableDemo03() {
    var intVal int
    intVal1, intVal := 1, 2
    fmt.Println(intVal1, intVal)
}

// 不带申明格式,只能在函数体中出现
// intVal1, intVal2 := 1, 2  // non-declaration statement outside function body

// 申明全局变量
var (
    intVal1 int
    intVal2 string
)



func main() {
    // fmt.Println("hello world")
    // variable()
    // variableInit()
    // variableTypeDeduction()
    // variableShorter()
    // fmt.Println(milesson, id)
    // triangle()
    // variableConst()
    // variableEnums()
    // variableList()
    // variableArrValue()


    // constDemo()

    variableDemo02()

    variableDemo03()
}
