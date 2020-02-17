import React, { Component, Fragment } from 'react';
import './index.css';

class Demo extends Component {
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

export default Demo;