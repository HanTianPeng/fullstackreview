import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.css';

// CSS过渡动画案例
class DemoOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isShow: prevState.isShow ? false : true
        }));
        // this.setState((prevState) => {
        //     console.log(prevState);
        //     return {
        //         isShow: prevState.isShow ? false : true
        //     };
        // })
    }

    render() {
        return (
            <Fragment>
                <div className={this.state.isShow ? 'show-div' : 'hide-div'}>hello World</div>
                <button onClick={this.handleClick}>toggle</button>
            </Fragment>
        );
    }
}

class DemoTransition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isShow: prevState.isShow ? false : true
        }));
        // this.setState((prevState) => {
        //     console.log(prevState);
        //     return {
        //         isShow: prevState.isShow ? false : true
        //     };
        // })
    }

    render() {
        return (
            <Fragment>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={1000}
                    classNames="fade"
                    unmountOnExit
                    onEntered={(el) => {el.style.color='yellow'}}
                    appear={true}
                >
                    <div>hello World</div>
                </CSSTransition>
                <button onClick={this.handleClick}>toggle</button>
            </Fragment>
        );
    }
}

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            list: [...prevState.list, 'item']
        }));
    }

    render() {
        return (
            <Fragment>
                {/* <CSSTransition
                    in={this.state.isShow}
                    timeout={1000}
                    classNames="fade"
                    unmountOnExit
                    onEntered={(el) => {el.style.color='yellow'}}
                    appear={true}
                > */}
                <TransitionGroup>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <CSSTransition
                                    timeout={1000}
                                    classNames="fade"
                                    unmountOnExit
                                    onEntered={(el) => {el.style.color='yellow'}}
                                    appear={true}
                                    key={item + index}
                                    >
                                    <div>item</div>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
                <button onClick={this.handleClick}>toggle</button>
            </Fragment>
        );
    }
}


export default Demo;