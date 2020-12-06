package mock

// Retriever 假的
type Retriever struct {
	Contents string
}

// Get 假的
func (retriever Retriever) Get(url string) string {
	return retriever.Contents
}