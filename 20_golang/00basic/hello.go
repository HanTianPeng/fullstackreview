package main

import (
	"os"
	"math"
	"fmt"
)

var (
    milesson = "课程"
    id = 100
)

func test001() {
    fmt.Printf("%T, %s\n", milesson, milesson)
}

func variable() {
    var name string
    var age int
    fmt.Printf("%q\n %d\n", name, age)
} 

func test() {
    // 使用 var 关键字申明变量,指定变量类型，如果没有初始化，则变量默认为零值(零值就是变量没有做初始化时系统默认设置的值)
    var name string
    fmt.Printf("%q\n", name)
    var age int
    fmt.Printf("%q, %d\n", age, age)
    var youName string = "conk"
    fmt.Printf("%q\n", youName)
     // 一次性申明多个变量
     var hisName, hisSex string
    fmt.Printf("%q, %q\n", hisName, hisSex)
    var myName, mySex string = "conk", "男"
    fmt.Printf("%q, %q\n", myName, mySex)
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

func test02() {
	var name, age, sex = "", 18, "男" 
    fmt.Printf("%q, %d, %s\n", name, age, sex)
}
 
func test03() {
    sex, name, age, isMe := "男", "", 18, true
    // %t: 格式化布尔值
    fmt.Printf("%s, %q, %d, %t\n", sex, name, age, isMe)
}

func test04() {
    var a, b int = 3, 4
    var c int
    c = int(math.Sqrt(float64(a * a + b * b)))
    fmt.Println(c)

    // na, nb := 3, 4
    // var nc int
    // 即使没有显示申明变量类型,变量也无法自动识别并转换数据类型
    // nc = int(math.Sqrt(na * na + nb * nb))
    // fmt.Println(nc)
}

func test06(m int) {
    fmt.Printf("%T\n", m)
    var d int = 10
    fmt.Println(d + m)
}

func test07(k float64) {
    fmt.Printf("%T\n", k)
    fmt.Println(k)
}


func test033() {
    a, b := 3, 4
    var c int
    c = int(math.Sqrt(float64((a * a + b * b))))
    fmt.Println(c)
}

func test08() {
    // const 一定要赋值
    const filename string = "a.txt"
    const a, b, m = 3, 4, "hello"
    const name, sex string = "conk", "男"
    fmt.Printf("%s, %s\n", name, sex)
}

func constDemo() {
    const a, b int = 3, 4
    var c int 
    c = int(math.Sqrt(float64(a * a) + float64(b * b)))
    fmt.Println(c)
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

// Person 类
type Person struct {
    name, sex string
    age int
}

func test0001() {
    conk := Person{name: "conk", sex: "男", age: 20}
    // 打印结构体实例
    fmt.Printf("%v\n", conk)  // {conk 男 20}
    // 如果值是一个结构体，%+v 的格式化输出内容将包括结构体的字段名
    fmt.Printf("%+v\n", conk)  // {name:conk sex:男 age:20}
    // %#v 形式则输出这个值的 Go 语法表示。例如，值的运行源代码片段
    fmt.Printf("%#v\n", conk)  // main.Person{name:"conk", sex:"男", age:20}
}

func test0002() {
    conk := Person{name: "conk", sex: "男", age: 20}
    // 打印值的类型
    fmt.Printf("%T\n", conk)  // main.Person
}

func test0003() {
    // 格式化布尔值
    fmt.Printf("%t\n", false)  // false
}

func test0004() {
    // 格式化整形数有多种方式，使用 %d进行标准的十进制格式化。
    fmt.Printf("%d\n", 124)  // 124
    // 输出二进制表示形式。
    fmt.Printf("%b\n", 60)  // 111100
    // 对于浮点型同样有很多的格式化选项。使用 %f 进行最基本的十进制格式化。
    fmt.Printf("%f\n", 78.9)  // 78.900000
    //%e 和 %E 将浮点型格式化为（稍微有一点不同的）科学技科学记数法表示形式。
    fmt.Printf("%e\n", 123400000.0)  // 1.234000e+08
    fmt.Printf("%E\n", 123400000.0)  // 1.234000E+08
}

func test0005() {
    // 这个输出给定整数的对应字符(ASCII码)。
    fmt.Printf("%c\n", 65)  // A
    // %x 提供十六进制编码
    fmt.Printf("%x\n", 65)  // 41
}

func test0006() {
    // 使用 %s 进行基本的字符串输出
    fmt.Printf("%s\n", "hello")  // hello
    // 像 Go 源代码中那样带有双引号的输出
    fmt.Printf("%q\n", "hello")  // "hello"
}

func test0007() {
    // 输出使用 base-16 编码的字符串，每个字节使用 2 个字符表示
    fmt.Printf("%x\n", "中")  // e4b8ad 3个字节, 一个字节2个字符
}

func test0008() {
    conk := Person{name: "conk", sex: "男", age: 20}
    // 要输出一个指针的值
    fmt.Printf("%p\n", &conk)  // 0xc000062180
}

func test0009() {
    // 当输出数字的时候，你将经常想要控制输出结果的宽度和精度，可以使用在 % 后面使用数字来控制输出宽度。默认结果使用右对齐并且通过空格来填充空白部分。
    fmt.Printf("|%-6d|\n", 123456)  // |123456|
    fmt.Printf("|%-6d|\n", 12)      // |12    |
    fmt.Printf("|%6d|\n", 12)       // |    12|  左对齐
    // 你也可以指定浮点型的输出宽度，同时也可以通过 宽度.精度 的语法来指定输出的精度。
    fmt.Printf("|%10.2f|\n", 1234567.12)    // |1234567.12|
    fmt.Printf("|%10.2f|\n", 12.1)          // |     12.10|
    fmt.Printf("|%-10.2f|\n", 12.1)         // |12.10     | 左对齐
    // 你也许也想控制字符串输出时的宽度，特别是要确保他们在类表格输出时的对齐。这是基本的右对齐宽度表示。
    fmt.Printf("|%6s|\n", "abcdef") // |abcdef|
    fmt.Printf("|%6s|\n", "foo")    // |   foo|
    fmt.Printf("|%-6s|\n", "foo")   // |foo   |  // 左对齐
}

func test0010() {
        // Sprintf 则格式化并返回一个字符串而不带任何输出。
        s := fmt.Sprintf("a %s", "string")
        fmt.Println(s)  // a string
        // 你可以使用 Fprintf 来格式化并输出到 io.Writers而不是 os.Stdout。
        fmt.Fprintf(os.Stderr, "an %s\n", "error")
}

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

    // variableDemo02()

    // variableDemo03()

    // printStruct()
    // variable()

    // variableDemo01()

    test0005()
}
