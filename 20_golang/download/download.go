package main 

import (
	"io"
	"aday/download/testing"
	// "aday/download/infra"
	"fmt"
)

func getRetriever() retriever {
	io.ReadWriteCloser()
	return testing.Retriever{}
}

// something that can "Get"
type retriever interface {
	Get(string) string
}

func main() {
	// var retrieve info.Retrieve = getRetrieve()
	retriever := getRetriever()
	fmt.Printf("%s\n", retriever.Get("https://www.baidu.com"))
}