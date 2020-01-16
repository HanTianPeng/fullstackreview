import React, {Component} from 'react';
import axios from 'axios';
import Menu from './menu.js';
// import Test from './test.js';
import './index.css';

class GirlComponent extends Component {
    constructor (props) {
        // 当组件的state或则props发生改变的时候，render函数就会重新执行
        super(props);
        this.state = {
            inputValue: 'World',
            data: ['Orange', 'Apple']
        };
    }

    // input框事件
    getInputChange(e){
        // 调用该方法的时候注意this的指向问题
        // 不能够通过this.state.inputValue = e.target.value,后续继续深入???
        
        // this.setState({
        //     inputValue: e.target.value
        //     // inputValue: this.input.value
        // });
        console.log('e.target===>', e.target);
        const value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }))
    }

    // 添加
    handleClick(){
        // inputValue初始化为字符串，
        // this.setState({
        //     data: [...this.state.data, this.state.inputValue],
        //     inputValue: ''
        // }, () => {
        //     console.log(this.ul.querySelectorAll('div').length);
        // });
        
        this.setState((prevState) => ({
            data: [...prevState.data, prevState.inputValue],
            inputValue: ''
        }), () => {
            console.log('1div-length--->', this.ul.querySelectorAll('div').length);
        });

        // setState为一个异步函数，执行需要一定时间，虚拟Dom渲染还没有结束，已经打印出来了，所以总会比上面少一条
        // console.log(this.ul.querySelectorAll('div').length);
        console.log('2div-length--->',this.ul.querySelectorAll('div').length);
    }

    // 删除
    deleteItem(index){
        // let data = [...this.state.data];
        // data.splice(index, 1);
        /*
            ['a', 'b', 'c'].splice(2, 0, 'd') ==> ['a', 'b', 'c', 'd']  增

            ['a', 'b', 'c'].splice(2, 1) ==> ['a', 'b']  删

            ['a', 'b', 'c'].splice(2, 1, 'd') ==> ['a', 'b', 'd']  改

            第二个点:
            immutable: state 不允许我们做任何的改变
            React禁止直接操作state，在后期的性能优化上会出现很多麻烦，所以不要这样操作
            this.state.data.splice(index, 1)
            this.setState({
                data: this.state.data
            })
        */
        // this.setState({
        //     data: data
        // });

        this.setState((prevState) => {
            const data = prevState.data;
            data.splice(index, 1);
            return {data};
        });

    }

    // 在组件即将被挂载到页面的时刻自动执行
    componentWillMount() {
        console.log('componentWillMount---在组件即将被挂载页面的时刻自动执行');
    };

    // 组件被更新之前，自动被执行
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate---组件被更新之前，自动被执行');
        return true;
    };

    // 组件被更新之前，自动被执行；但是在shouldComponentUpdate之后被执行
    // 如果shouldComponentUpdate返回true，被自动执行
    // 如果shouldComponentUpdate返回false，不执行
    componentWillUpdate() {
        console.log('componentWillUpdate---shouldComponentUpdate之后，自动执行');
    }

    render() {
        console.log('证明state或则props发生改变的时候，render函数重新执行');
        return (
            <div>
                {
                    /* 
                        JSX注释的正确写法 vscode快捷键ctrl + /即可完成 

                        给JSX中加入样式，需要写成className

                        <label>标签的for应该修改成htmlFor, label作用扩大点击区域

                        文本按照html进行解析，需要dangerouslySetInnerHTML属性解决
                    */
                }
                <label htmlFor="goodsInput">添加商品：</label>
                <input 
                    id="goodsInput" 
                    // ref={(input) => {this.input=input}}
                    className="input" 
                    value={this.state.inputValue} 
                    onChange={this.getInputChange.bind(this)} 
                />
                <button onClick={this.handleClick.bind(this)} >请开始添加您的购物车</button>
                {/* <Test content={this.state.inputValue}/> */}
                <ul ref={(ul) => {this.ul=ul}}>
                    {this.state.data.map((item, index) => {
                    return (
                                // <li 
                                //     key={index + item} 
                                //     onClick={this.deleteItem.bind(this, index)}
                                //     dangerouslySetInnerHTML={{__html:item}}
                                // >
                                // </li>

                                <Menu key={index + item} content={item} index={index} data={this.state.data} deleteItem={this.deleteItem.bind(this)} />
                            );
                    })}
                </ul>
            </div>
        );
    };

    // 
    componentWillUnmount() {
        console.log('componentWillUnmount----');
    }

    // 组件更新完成后，自动被执行
    componentDidUpdate() {
        // ajax请求一般写在这里
        console.log('componentDidUpdate----组件更新完成后，自动执行');
    }

    // 组件被挂载到页面之后，自动被执行
    componentDidMount() {
        console.log('componentDidMount---在组件被挂载到页面之后，自动被执行');
        axios.get('/api/mock_data')
            .then((res) => {alert(JSON.stringify(res))})
            .catch(() => {alert('error')});
    };
}



export default GirlComponent;