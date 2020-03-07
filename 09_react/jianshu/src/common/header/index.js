import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { actionCreators as loginActionCreators } from '../../pages/login/store';


class Header extends Component {
    getSearchArea() {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangeList } = this.props;
        const toListJS = list.toJS();
        if(focused || mouseIn) {
            const newPageList = [];
            for (let index = (page - 1)*5; index < page*5; index++) {
                if(toListJS[index]){
                    newPageList.push(
                        <SearchInfoItem key={toListJS[index] + index}>{toListJS[index]}</SearchInfoItem>
                    );
                }
            }
            return (
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchTitle>
                        标题
                        <SearchSwith onClick={() => {handleChangeList(totalPage, page, this.spinIcon)}}>
                            <span ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe606;</span>
                            换一换
                        </SearchSwith>
                    </SearchTitle>
                    <SearchInfoItemList>
                        {newPageList.map((item, index, arr) => {
                            return item
                        })}
                    </SearchInfoItemList>
                </SearchInfo>
            );
        }
        return null;
    }
    render() {
        const { focused, list, login, handleInputFocus, handleInputBlur, logoutSubmit } = this.props;
        return (
            <HeaderWrapper>
                <GlobalIconFontsStyled />
                <Link to="/">
                    <Logo />
                </Link>
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
                                onFocus={() => {handleInputFocus(list)}}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <span className={focused ? 'iconfont zoom focused': 'iconfont zoom'}>&#xe60b;</span>
                        {this.getSearchArea()}
                    </NavSearchWrapper>
                    {   login ?
                        <NavItem onClick={logoutSubmit} className="right">
                        退出
                        </NavItem> 
                            :
                        <Link to="/login">
                            <NavItem className="right">
                                登录
                            </NavItem>
                        </Link>
                    }
                    <NavItem className="right">
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                </Nav>
                <Addition>
                    <Link to="/write">
                        <Button className="writting">
                            <span className="iconfont">&#xe6e5;</span>
                            写文章
                        </Button>
                    </Link>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }
}

// const getSearchArea = (isShow) => {
//     if(isShow) {
//         return (
//             <SearchInfo>
//                 <SearchTitle>
//                     标题
//                     <SearchSwith>
//                         换一换
//                     </SearchSwith>
//                 </SearchTitle>
//                 <SearchInfoItemList>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                     <SearchInfoItem>教育</SearchInfoItem>
//                 </SearchInfoItemList>
//             </SearchInfo>
//         );
//     }
//     return null;
// };

// const Header = (props) => {
//     const { focused, handleInputFocus, handleInputBlur } = props;
//     return (
//         <HeaderWrapper>
//             <GlobalIconFontsStyled />
//             <Logo />
//             <Nav>
//                 <NavItem className="left active">首页</NavItem>
//                 <NavItem className="left">下载App</NavItem>
//                 <NavSearchWrapper>
//                     <CSSTransition
//                         in={focused}
//                         timeout={500}
//                         classNames='slide'
//                     >
//                         <NavSearch
//                             className={focused ? 'focused': ''}
//                             onFocus={handleInputFocus}
//                             onBlur={handleInputBlur}
//                         >
//                         </NavSearch>
//                     </CSSTransition>
//                     <span className={focused ? 'iconfont focused': 'iconfont'}>&#xe60b;</span>
//                     {getSearchArea(focused)}
//                 </NavSearchWrapper>
//                 <NavItem className="right">登录</NavItem>
//                 <NavItem className="right">
//                     <span className="iconfont">&#xe636;</span>
//                 </NavItem>
//             </Nav>
//             <Addition>
//                 <Button className="writting">
//                     <span className="iconfont">&#xe6e5;</span>
//                     写文章
//                 </Button>
//                 <Button className="reg">注册</Button>
//             </Addition>
//         </HeaderWrapper>
//     );
// };

const mapStateToProps = (state) => {
    return {
        // redux-immutable使得state也immutable了
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login'])
    }
};

const mapDispatchToProps = (Dispatch) => {
    return {
        handleInputFocus(list) {
            (list.size === 0) && Dispatch(actionCreators.getList());
            Dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            Dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            Dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            Dispatch(actionCreators.mouseLeave());
        },
        handleChangeList(totalPage, page, spinIcon) {
            let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '');
            if(originAngle) {
                originAngle = parseInt(originAngle, 10);
            }else{
                originAngle = 0;
            }
            spinIcon.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'; 
            if(page >= totalPage) {
                page = 1;
            }else{
                page = page + 1;
            }
            Dispatch(actionCreators.changeList(page));
        },
        logoutSubmit() {
            Dispatch(loginActionCreators.logoutAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);