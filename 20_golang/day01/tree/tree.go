package tree

import (
	"fmt"
)

// go语言仅支持封装,不支持继承，多态

// go语言没有class,只有struct

type TreeNode struct {
	Value int
	Left, Right *TreeNode
}

func (node TreeNode) PrintNode() {
	fmt.Println(node.Value)
}

// 使用指针作为方法接收者
func (node *TreeNode) SetValue(value int) {
	if node == nil {
		fmt.Println("node 为nil")
		return 
	}
	node.Value = value
}

func (node *TreeNode) TreeNodeTravelsal() {
	if node == nil {
		return 
	}
	node.Left.TreeNodeTravelsal()
	node.PrintNode()
	node.Right.TreeNodeTravelsal()
}

func CreateNode(value int) *TreeNode {
	return &TreeNode{Value: value}
}


