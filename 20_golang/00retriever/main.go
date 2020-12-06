package main

import (
	"time"
	"aday/retriever/real"
	"aday/retriever/mock"
	"fmt"
)

// Retriever 接口 一个interface就是包含了一系列行为的method集合
type Retriever interface {
	Get(url string) string
}

func download(r Retriever) string {
	return r.Get("https://www.baidu.com")
} 

func inspect(r Retriever) {
	switch v := r.(type) {
	case mock.Retriever:
		fmt.Printf("Contents: %s\n", v.Contents)
	case *real.Retriever:
		fmt.Printf("UserAgent: %s\n", v.UserAgent)
	}
}

func main() {
	var r Retriever
	r = mock.Retriever{Contents: "mock data"}
	// fmt.Println(download(r))
	inspect(r)
	fmt.Printf("%T, %v\n", r, r)
	r = &real.Retriever{
		UserAgent: "Mozilla/5.0",
		TimeOut: time.Minute,
	}
	inspect(r)
	fmt.Printf("%T, %v\n", r, r)

	// Type assertion
	realRetriever := r.(*real.Retriever)
	fmt.Printf("realRetriever- %v TimeOut: %s\n", realRetriever, realRetriever.TimeOut)
	// fmt.Println(download(r))
}