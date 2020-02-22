import React from 'react';
// import React, { Component } from 'react';
// import store from './store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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


// mapStateToProps这个函数允许我们将store中的数据作为props绑定到组件上
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    };
};

// store.dispatch挂载到props上面(将action作为props绑定到组件上)
// const mapDispatchToProps = (dispatch) => {
//     return {
//         handleChange(e) {
//             const action = {
//                 type: 'change_input_value',
//                 inputValue: e.target.value
//             };
//             dispatch(action);
//         },

//         handleClick() {
//             const action = {
//                 type: 'add_input_value'
//             };
//             dispatch(action);
//         }
//     };
// };

//
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        handleChange: (e) => ({
            type: 'change_input_value', 
            inputValue: e.target.value
        }),
        handleClick: () => ({
            type: 'add_input_value'
        })
    }, dispatch);
};

/* 
    react-redux提供了两个重要对象, Provider和connect,前者使React组件可被连接(connectable),
    后者把React组件和store真正连接起来.

    react-redux中的connect方法将store上的getState和dispatch包装成组件的props

    connect方法接受四个参数(mapStateToProps, mapDispatchToProps, mergeProps, options):
        mapStateToProps(state, ownProps): 将store中的数据作为props绑定到组件上
            返回值: stateProps
            state: 就是redux中的store(state)
            ownProps: 组件自己的属性
            当state变化或者ownProps变化的时候,mapStateToProps都会被调用,计算出一个新的stateProps,(在与ownProps进行merge之后)更新到组件中

        mapDispatchToProps(dispatch, ownProps): 将action作为props绑定到组件上
            当ownProps变化的时候,该函数也会被调用,生成一个新的dispatchProps,(在与stateProps和ownProps进行merge之后)更新到组件中

        mergeProps(stateProps, dispatchProps, ownProps): 
            返回值: props
            不管是stateProps还是dispatchProps,都需要和ownProps进行merge之后才会赋值给组件,这个动作就是第三个参数完成的.
            通常情况下,你可以不传这个参数,connect就会使用Object.assign替代该方法.
*/
export default connect(mapStateToProps, mapDispatchToProps)(TodoListDemo);