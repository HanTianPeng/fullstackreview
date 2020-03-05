import styled from 'styled-components';
import logoPic from '../../statics/logo.png';


export const HeaderWrapper = styled.div`
    position: relative;
    height: 56px;
`;

// export const Logo = styled.a.attrs({
//     href: '/'
// })`
export const Logo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    width: 100px;
    background: url(${logoPic});
    background-size: contain;
`;

export const Nav = styled.div`
    width: 960px;
    height: 100%;
    margin: 0 auto;
`;

export const NavItem = styled.div`
    line-height: 56px;
    font-size: 17px;
    padding: 0 15px;
    color: #333;
    &.left {
        float: left;
    }
    &.right {
        float: right;
        color: #969696;
    }
    &.active {
        color: #ea6f5a;
    }
`;

export const NavSearchWrapper = styled.div`
    float: left;
    position: relative;
    margin-left: 20px;
    .zoom {
        position: absolute;
        bottom: 4px;
        right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        &.focused {
            background: #969696;
            color: #fff;
        }
    }
`;

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
    height: 38px;
    width: 160px;
    outline: none;
    border: none;
    border-radius: 19px;
    margin-top: 9px;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    background: #eee;
    color: #666;
    font-size: 14px;
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 240px;
    }
    &.slide-enter {
        transition: width .5s ease-out;
    }
    &.slide-enter-active {
        width: 240px;
    }
    &.slide-exit {
        transition: width .2s ease-out;
    }
    &.slide-exit-active {
        width: 160px;
    }
`;

export const SearchInfo = styled.div`
    position: absolute;
    top: 56px;
    left: 0;
    padding: 0 20px;
    width: 200px;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
`;

export const SearchTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    color: #969696;
    line-height: 20px;
    font-size: 14px;
`;

export const SearchSwith = styled.span`
    float: right;
    font-size: 14px;
    cursor: pointer;
    .spin {
        display: block;
        float: left;
        font-size: 12px;
        margin-right: 4px;
        transition: all .2s ease-in;
        transform: rotate(80deg);
        transform-origin: center center;
    }
`;

export const SearchInfoItemList = styled.div`
    overflow: hidden;
`;

export const SearchInfoItem = styled.a`
    float: left;
    padding: 0 5px;
    margin-right: 10px;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 20px;
    color: #333;
    border-radius: 2px;
    border: 1px solid #ddd;
`;

export const Addition = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 56px;
`;

export const Button = styled.div`
    font-size: 14px;
    float: right;
    line-height: 38px;
    border-radius: 19px;
    margin-top: 9px;
    margin-right: 20px;
    padding: 0 20px;
    border: 1px solid rgba(236,97,73,.7);
    &.reg {
        color: rgba(236,97,73,.7);
    }
    &.writting {
        background: #ea6f5a;
        color: #fff;
    }
`;