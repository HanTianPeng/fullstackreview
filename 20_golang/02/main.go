package main

import (
	"fmt"
)

type data int

func (d data) String() string {
	return fmt.Sprintf("data : %d\n", d)
}

func test001() {
	// 创建一个data类型的实例
	var d data = 10
	// 创建一个interface实例
	var inter interface{} = d
	fmt.Printf("%T\n", inter)  // main.data

	// 判断inter的更具体接口类型: 初始化为interface{} 更具体的为fmt.Stringer
	if x, ok := inter.(fmt.Stringer); ok {
		fmt.Println(x) // data: 10
	}

	// 判断inter的原始类型
	if y, ok := inter.(data); ok {
		fmt.Println(y) // data: 10
	}

	// panic: interface conversion: main.data is not error: missing method Error
	e := inter.(error)  // 不使用ok-idiom模式，转换失败会引发panic
	fmt.Println(e)
}

func inspect(inter interface{}) {
	switch v := inter.(type) {
	case nil:
		fmt.Println("nil")
	case *int:
		fmt.Println(*v)
	case func(int) string:
		fmt.Println(v(100))
	case fmt.Stringer:
		fmt.Println(v)
	default:
		println("not support")
	}
} 

func test002() {
	var inter interface{} = func(num int) string {
		return fmt.Sprintf("num: %d\n", num)
	}
	inspect(inter)
}

func test003() {
	var a interface{}
	var b string
	a = "ssss"
	b = a.(string)
	fmt.Println(a, b)
}

// Animaler 接口: 所有遵从该接口协议的,均需要实现speak方法
type Animaler interface {
	speak() string
	eat(foot string) string
}

func anmialSpeak(animaler Animaler) string {
	return animaler.speak()
}

func anmialEat(animaler Animaler, food string) string {
	return animaler.eat(food)
}

// Dog 类
type Dog struct {
	name string
}

// speak Dog的方法
func (d Dog) speak() string {
	return "汪汪"
}

func (d Dog) eat(foot string) string {
	return fmt.Sprintf("%s: eat %s", d.name, foot)
}

// Cat 类
type Cat struct {
	age int
}

// speak Cat的方法
func (c *Cat) speak() string {
	return "喵喵"
}

func (c *Cat) eat(foot string) string {
	return fmt.Sprintf("%d cat eat %s", c.age, foot)
}

func test009() {
	// 编译报错: cannot use Cat literal (type Cat) as type Animaler in slice literal: Cat does not implement Animaler (eat method has pointer receiver)
	// animals := []Animaler {Dog{"大白"}, Cat{18}}
}

func test010() {
	anmials := []Animaler {Dog{"大白"}, &Cat{18}, &Dog{"小黑"}}
	for _, animal := range anmials {
		fmt.Println(anmialSpeak(animal))
		fmt.Println(anmialEat(animal, "rice"))
	}
}

func test004() {
	dog := Dog{name : "大白"}
	// &cat := Cat{age: 2}
	fmt.Println(anmialSpeak(dog))  // 汪汪
	// fmt.Println(anmialSpeak(&cat))  // 喵喵
	fmt.Println(anmialEat(dog, "猪肉"))  // 大白: eat 猪肉
	// fmt.Println(anmialEat(cat, "猫粮"))  // 2 cat eat 猫粮

}

func test005() {
	var inter1, inter2 interface{}
	fmt.Println(inter1 == nil, inter1 == inter2) // true true
	inter1, inter2 = 1, 1
	fmt.Println(inter1 == inter2)  // true
	inter1, inter2 = map[string]int{}, map[string]int{}
	// panic: runtime error: comparing uncomparable type map[string]int
	fmt.Println(inter1 == inter2)
}

type stringer interface {
	string() string
}

type tester interface {
	stringer
	test()
}

type person struct {}

func (p person) string() string {
	return "string 格式化"
}

func (p person) test() {
	fmt.Println("test 方法")
}

func test006() {
	var p person
	var t tester = p
	t.test()  // test 方法
	fmt.Println(t.string())  // string 格式化
}

func done(vals []interface{}) {
	for _, val := range vals {
		fmt.Println(val)
	}
}

func test007() {
	// vals := []string {"conk", "pht", "nimibox"}
	// 编译报错: cannot use vals (type []string) as type []interface {} in argument to done
	// done(vals)
}

func test008() {
	vals := []string {"conk", "pht", "nimibox"}
	newVals := make([]interface{}, len(vals))
	for index, v := range vals {
		newVals[index] = v
	}
	done(newVals)
}

func main() {
	test010()
}