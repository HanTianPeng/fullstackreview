import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import "antd/dist/antd.css";
import store from './store/index.js';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
            <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                <div>
                    <Input 
                        value={this.state.inputValue} 
                        placeholder="Todo List" 
                        style={{ marginRight: "10px", width: "300px", height: "30px" }} 
                        onChange={this.handleChange}
                    />
                    <Button 
                        type="danger"
                        onClick={this.handleButtonClick}
                    >提交</Button>
                </div>
                <List
                    style={{ width: "300px", marginTop: "10px" }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    handleChange(e) {
        const action = {
            type: "change_input_value",
            value: e.target.value
        };
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleButtonClick() {
        const action = {
            type: "submit_input_value"
        };
        store.dispatch(action);
    }
}

export default TodoList;
