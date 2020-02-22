import React from 'react';
// import React, { Component } from 'react';
// import store from './store';
import { connect } from 'react-redux';

// TodoListDemo既是一个ui组件,也是一个无状态组件
const TodoListDemo = (props) => {
    const { inputValue, list, handleChange, handleClick } = props;
    return (
        <div>
            <input value={inputValue} onChange={handleChange} />
            <button onClick={handleClick}>添加商品</button>
            <ul>
                {
                    list.map((item, index) => {
                    return <li key={item + index}>{item}</li    >;
                    })
                }
            </ul>
        </div>
    );
}


// class TodoListDemo extends Component {
//     render() {
//         const { inputValue, list, handleChange, handleClick } = this.props;
//         return (
//             <div>
//                 <input value={inputValue} onChange={handleChange} />
//                 <button onClick={handleClick}>添加商品</button>
//                 <ul>
//                     {
//                         list.map((item, index) => {
//                         return <li key={item + index}>{item}</li    >;
//                         })
//                     }
//                 </ul>
//             </div>
//         );
//     }
// }

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    };
};

// store.dispatch挂载到props上面
const mapDispatchToProps = (dispatch) => {
    return {
        handleChange(e) {
            const action = {
                type: 'change_input_value',
                inputValue: e.target.value
            };
            dispatch(action);
        },

        handleClick() {
            const action = {
                type: 'add_input_value'
            };
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDemo);