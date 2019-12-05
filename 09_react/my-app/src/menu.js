import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    constructor(props){
        super(props);
        // 构造函数中绑定性能会高一些，特别是在高级组件开发中，会有很大的作用。
        this.handleClick = this.handleClick.bind(this);
    }

    // 利用中间件进行性能优化
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }
        return false;
    }

    handleClick(){
        // 在React中明确规定，子组件是不能操作父组件里的数据的，所以需要借助父组件的方法，来修改父组件的内容
        // this.props.data = [];  React的单项数据流，仅可读不可修改
        this.props.deleteItem(this.props.index);
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
    content: PropTypes.string.isRequired,  // 必须传值
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

// 默认值
Menu.defaultProps = {
    tt: '测试'
}

export default Menu;