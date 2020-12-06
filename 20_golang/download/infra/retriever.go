package infra

import (
	"io/ioutil"
	"net/http"
)

// Retriever 获取
type Retriever struct {

}

// Get 发送get请求
func (retriever Retriever) Get(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	bytes, _ := ioutil.ReadAll(resp.Body)
	return string(bytes)
}