import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    constructor(props){
        super(props);
        // 构造函数中绑定性能会高一些，特别是在高级组件开发中，会有很大的作用。
        this.handleClick = this.handleClick.bind(this);
    }

    // 当一个组件从父组件接收参数
    // 只要父组件的render函数被执行了，子组件的这个生命周期函数就会被自动自动执行
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps----');
    }

    // 利用中间件进行性能优化
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }
        return false;
    }

    // 组件即将从页面中移除的时候，自动执行
    componentWillUnmount() {
        console.log('child componentWillUnmount----');
    }

    handleClick(){
        // 在React中明确规定，子组件是不能操作父组件里的数据的，所以需要借助父组件的方法，来修改父组件的内容
        // this.props.data = [];  React的单项数据流，仅可读不可修改
        // this.props.deleteItem(this.props.index); 
        // 优化后代码---解构赋值
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.content}
            </div>
        )
    }
}

// 注意，这个propTypes属性不要写错
Menu.propTypes = {
    testField: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,  // 必须传递，不是代表不能为空
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

// 默认值
Menu.defaultProps = {
    testField: '默认值'  // 为 isRequired 做的默认值
}

export default Menu;