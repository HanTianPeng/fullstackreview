import styled from 'styled-components';

export const LoginWrapper = styled.div`
    z-index: 0;
    background: #f1f1f1;
    position: absolute;
    top: 56px;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const LoginMain = styled.div`
    padding: 50px;
    width: 400px;
    box-sizing: border-box;
    margin: 60px auto;
    vertical-align: middle;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const LoginTitle = styled.div`
    text-align: center;
    padding: 10px;
    font-weight: 400;
    font-size: 18px;
    color: #969696;
    margin-bottom: 50px;
`;

export const LoginB = styled.b`
    padding: 10px;
`;

export const LoginLeft = styled.div`
    display:inline-block;
    padding: 10px;
    &.active {
        font-weight: 700;
        color: #ea6f5a;
        
        border-bottom: 2px solid #ea6f5a;
    }
`;

export const LoginRight = styled.div`
    display:inline-block;
    padding: 10px;
    .active {
        font-weight: 700;
        color: #ea6f5a;
    }
`;

export const LoginData = styled.div`

`;

export const InputDiv = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
`;

export const NameInput = styled.input.attrs({
    placeholder: "手机号或邮箱"
})`
    height: 100%;
    width: 100%;
    background: hsla(0,0%,71%,.1);
    outline: none;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    padding: 4px 12px 4px 35px;
    box-sizing: border-box;
    color: #666;
    font-size: 14px;
`;

export const PWDInput = styled.input.attrs({
    placeholder: "密码"
})`
    height: 100%;
    width: 100%;
    background: hsla(0,0%,71%,.1);
    outline: none;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    padding: 4px 12px 4px 35px;
    box-sizing: border-box;
    color: #666;
    font-size: 14px;
`;

export const ButtonSubmit = styled.div`
    background: #3194d0;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
    border-radius: 25px;
    font-size: 18px;
    cursor: pointer;
`