// import React, { Component } from 'react';
import React from 'react';
import { Input, Button, List } from 'antd';

const TodoListUI = (props) => {
    return (
        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
            <div>
                <Input 
                    value={props.inputValue} 
                    placeholder="Todo List" 
                    style={{ marginRight: "10px", width: "300px", height: "30px" }} 
                    onChange={props.handleChange}
                />
                <Button 
                    type="danger"
                    onClick={props.handleButtonClick}
                >提交</Button>
            </div>
            <List
                style={{ width: "300px", marginTop: "10px" }}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={() => {props.handleDeleteItem(index)}}
                    >
                        {item}
                    </List.Item>
                )}
            />
        </div>
    );
}


// class TodoListUI extends Component {

//     render() {
//         return (
//             <div style={{ marginTop: "30px", marginLeft: "20px" }}>
//                 <div>
//                     <Input 
//                         value={this.props.inputValue} 
//                         placeholder="Todo List" 
//                         style={{ marginRight: "10px", width: "300px", height: "30px" }} 
//                         onChange={this.props.handleChange}
//                     />
//                     <Button 
//                         type="danger"
//                         onClick={this.props.handleButtonClick}
//                     >提交</Button>
//                 </div>
//                 <List
//                     style={{ width: "300px", marginTop: "10px" }}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={(item, index) => (
//                         // () => {this.props.handleDeleteItem(index)}箭头函数可以解决this的指向,此时this的指向为父级
//                         // 为什么上面不需要绑定this ???疑问
//                         <List.Item
//                             onClick={() => {this.props.handleDeleteItem(index)}}
//                         >
//                             {item}
//                         </List.Item>
//                     )}
//                 />
//             </div>
//         );
//     }
// }

export default TodoListUI;