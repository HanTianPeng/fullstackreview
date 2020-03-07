import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight
} from './style';
import Topic from './components/Topic';
import Writer from './components/Writer';
import List from './components/List';
import Recommend from './components/Recommend';
import { actionCreators } from './store';
import {
    BackUp
} from './style';


class Home extends Component {
    
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4894/23ecc55accf5c6a6c9910be966c125853d1f04a5.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="500" />
                    <Topic />
                    <List />
                </HomeLeft>

                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>

                {this.props.isShow ? <BackUp onClick={this.handleScrollTop}>回到顶部</BackUp> : null}
            </HomeWrapper>
        );
    }

    componentDidMount() {
        this.props.getHomeData();
        this.bindEvents();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.props.handleScrollTop);
    }

    handleScrollTop() {
        window.scrollTo(0, 0);
    }

    bindEvents() {
        window.addEventListener("scroll", this.props.handleScrollTop);
    }
}

const mapStateToProps = (state) => ({
    isShow: state.getIn(["home", "isShow"])
});

const mapDispatchToProps = (Dispatch) => ({
    getHomeData() {
        Dispatch(actionCreators.initHomedata());
    },
    handleScrollTop() {
        if(document.documentElement.scrollTop > 100) {
            Dispatch(actionCreators.ChangeScrollTop(true));
        }else{
            Dispatch(actionCreators.ChangeScrollTop(false));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);