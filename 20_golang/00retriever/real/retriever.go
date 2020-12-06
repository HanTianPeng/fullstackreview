package real

import (
	"io"
	"net/http/httputil"
	"net/http"
	"time"
)

// Retriever 真的
type Retriever struct {
	UserAgent string
	TimeOut time.Duration
}

// Get 真的
func (retriever *Retriever) Get(url string) string {
	io.Reader
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	result, err := httputil.DumpResponse(resp, true)

	resp.Body.Close()

	if err != nil {
		panic(err)
	}
	return string(result)
}