import React, { Component } from 'react';
import { Input, Button, List } from 'antd';


class TodoListUI extends Component {

    render() {
        return (
            <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                <div>
                    <Input 
                        value={this.props.inputValue} 
                        placeholder="Todo List" 
                        style={{ marginRight: "10px", width: "300px", height: "30px" }} 
                        onChange={this.props.handleChange}
                    />
                    <Button 
                        type="danger"
                        onClick={this.props.handleButtonClick}
                    >提交</Button>
                </div>
                <List
                    style={{ width: "300px", marginTop: "10px" }}
                    bordered
                    dataSource={this.props.list}
                    renderItem={(item, index) => (
                        // (index) => {this.props.handleDeleteItem(index)}箭头函数可以解决this的指向,此时this的指向为父级
                        // 为什么上面不需要绑定this ???疑问
                        <List.Item
                            onClick={(index) => {this.props.handleDeleteItem(index)}}
                        >
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default TodoListUI;