package main

import (
	"fmt"
)

func main() {
	var node tree.TreeNode
	fmt.Println(node)

	node = TreeNode{value: 3}
	node.left = &TreeNode{}
	node.right = &TreeNode{5, nil, nil}
	node.right.left = new(TreeNode)
	fmt.Println(node)

	node.right.left.SetValue(100)
	node.right.left.PrintNode()

	// slice
	nodes := []TreeNode {
		{value: 3},
		{5, nil, nil},
		{6, nil, &node},
		{10, nil, nil},
	}
	fmt.Println(nodes)

	var pRoot *TreeNode
	fmt.Println("--------")
	fmt.Println(pRoot)
	pRoot.SetValue(1)
	fmt.Println(pRoot)
}