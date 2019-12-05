import React, {Component} from 'react';
import Menu from './menu.js';
import './index.css';

class GirlComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: 'World',
            data: ['Orange', 'Apple']
        };
    }

    // input框事件
    getInputChange(e){
        // 不能够通过this.state.inputValue = e.target.value,后续继续深入???
        this.setState({
            inputValue: e.target.value
            // inputValue: this.input.value
        });
    }

    // 添加
    handleClick(){
        // inputValue初始化为字符串，
        this.setState({
            data: [...this.state.data, this.state.inputValue],
            inputValue: ''
        }, () => {
            console.log(this.ul.querySelectorAll('div').length);
        });
        // setState为一个异步函数，执行需要一定时间，虚拟Dom渲染还没有结束，已经打印出来了，所以总会比上面少一条
        // console.log(this.ul.querySelectorAll('div').length);
    }

    // 删除
    deleteItem(index){
        let data = this.state.data;
        data.splice(index, 1);
        /*
            ['a', 'b', 'c'].splice(2, 0, 'd') ==> ['a', 'b', 'c', 'd']  增

            ['a', 'b', 'c'].splice(2, 1) ==> ['a', 'b']  删

            ['a', 'b', 'c'].splice(2, 1, 'd') ==> ['a', 'b', 'd']  改

            第二个点:
            React禁止直接操作state，在后期的性能优化上会出现很多麻烦，所以不要这样操作
            this.state.data.splice(index, 1)
            this.setState({
                data: this.state.data
            })
        */
        this.setState({
            data: data
        });

    }

    render() {
        // 必须绑定当前组件GirlComponent,后续继续深入???
        return (
            <div>
                {
                    /* 
                        JSX注释的正确写法 vscode快捷键ctrl + /即可完成 

                        给JSX中加入样式，需要写成className

                        <label>标签的for应该修改成htmlFor

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
}



export default GirlComponent;