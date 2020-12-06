### 数据类型
1. 布尔类型(bool) true / false

2. 数字类型
    - 整型

    - 浮点型

3. 字符串型

### 位运算
60
60 / 2 = 30 --- 0       0           
30 / 2 = 15 --- 0       00          
15 / 2 = 7 ---- 1       100
7 / 2 = 3 ----- 1       1100
3 / 2 = 1 ----- 1       11100
1 / 2 = 0 ----- 1       111100  1*2^5 + 1*2^4 + 1*2^3 + 1*2^2 + 0*2^1 + 0*2^0 = 32 + 16 + 8 + 4 = 60

60 << 2 11110000 1*2^7 + 1*2^6 + 1*2^5 + 1*2^4 + 1*2^0 + 1*2^0 + 0*2^0 + 0*2^0 = 128 + 64 + 32 + 16 = 240

60 >> 2 1111 1*2^3 + 1*2^2 + 1*2^1 + 1*2^0 = 8 + 4 + 2 + 1 = 15

### Println, Printf两者之间区别
- Println可以打印出字符串,变量

- Printf只可打印出格式化的字符串,可以输出字符串类型的变量,不可以输出整型变量和整型

### 运行环境
- GOPATH
    - go env | grep GOPATH

    - go env -W GOPATH="/Users/conk/testgo"

    - export GOPATH="/Users/conk/testgo"

    - testgo 目录下 mkdir src

    - testgo 目录下 src 目录下 核查 go env | grep GOPATH

    - ide 设置 GOPATH 为 /Users/conk/testgo

    - ide terminal 核查 go env | grep GOPATH

    - export GO111MODULE="off"

    - ide  runner按钮的 设置 GO111mODULE="OFF"

- GOVENDOR
    - 每个项目建立自己的vendor目录,存放第三方库

    - 大量的第三方依赖管理工具: glide / dep / go dep 

- GO MOD 
    - go mod tidy 清洁依赖 

    - go build ./...

    - go finding golang.org/x/tools

    - go install ./...
    