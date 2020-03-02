import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { 
            HeaderWrapper, 
            Logo, 
            Nav, 
            NavItem, 
            NavSearchWrapper, 
            NavSearch, 
            SearchInfo, 
            SearchTitle, 
            SearchSwith,
            SearchInfoItemList,
            SearchInfoItem,
            Addition, 
            Button 
        } from './style';
import { GlobalIconFontsStyled } from '../../statics/iconfonts/iconfont.js';
import { actionCreators } from './store';



const getSearchArea = (isShow) => {
    if(isShow) {
        return (
            <SearchInfo>
                <SearchTitle>
                    标题
                    <SearchSwith>
                        换一换
                    </SearchSwith>
                </SearchTitle>
                <SearchInfoItemList>
                    <SearchInfoItem>教育</SearchInfoItem>
                    <SearchInfoItem>教育</SearchInfoItem>
                    <SearchInfoItem>教育</SearchInfoItem>
                    <SearchInfoItem>教育</SearchInfoItem>
                    <SearchInfoItem>教育</SearchInfoItem>
                </SearchInfoItemList>
            </SearchInfo>
        );
    }
    return null;
};

const Header = (props) => {
    const { focused, handleInputFocus, handleInputBlur } = props;
    return (
        <HeaderWrapper>
            <GlobalIconFontsStyled />
            <Logo />
            <Nav>
                <NavItem className="left active">首页</NavItem>
                <NavItem className="left">下载App</NavItem>
                <NavSearchWrapper>
                    <CSSTransition
                        in={focused}
                        timeout={500}
                        classNames='slide'
                    >
                        <NavSearch
                            className={focused ? 'focused': ''}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        >
                        </NavSearch>
                    </CSSTransition>
                    <span className={focused ? 'iconfont focused': 'iconfont'}>&#xe60b;</span>
                    {getSearchArea(focused)}
                </NavSearchWrapper>
                <NavItem className="right">登录</NavItem>
                <NavItem className="right">
                    <span className="iconfont">&#xe636;</span>
                </NavItem>
            </Nav>
            <Addition>
                <Button className="writting">
                    <span className="iconfont">&#xe6e5;</span>
                    写文章
                </Button>
                <Button className="reg">注册</Button>
            </Addition>
        </HeaderWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        // redux-immutable使得state也immutable了
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header', 'focused'])
    }
};

const mapDispatchToProps = (Dispatch) => {
    return {
        handleInputFocus() {
            Dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            Dispatch(actionCreators.searchBlur());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);