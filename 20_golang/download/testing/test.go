package testing

// Retriever : 测试
type Retriever struct {}

// Get : 测试get方法
func (retriever Retriever) Get(url string) string {
	return "hello world"
}