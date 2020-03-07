import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
    LoginWrapper,
    LoginMain,
    LoginTitle,
    LoginLeft,
    LoginB,
    LoginRight,
    LoginData,
    InputDiv,
    NameInput,
    PWDInput,
    ButtonSubmit
} from './style';
import { actionCreators } from './store';


class Login extends PureComponent {
    render() {
        const {login, loginSubmit} = this.props;
        if (login){
            return <Redirect to="/" />
        }else{
            return (
                <LoginWrapper>
                    <LoginMain>
                        <LoginTitle>
                            <LoginLeft className="active">
                                登录
                            </LoginLeft>
                            <LoginB>
                                .
                            </LoginB>
                            <LoginRight>
                                注册
                            </LoginRight>
                        </LoginTitle>
                        <LoginData>
                            <InputDiv>
                                {/* innerRef */}
                                <NameInput ref={(input) => {this.name = input}}></NameInput>
                            </InputDiv>
                            <InputDiv>
                                <PWDInput ref={(input) => {this.pwd = input}}></PWDInput>
                            </InputDiv>
                            <ButtonSubmit onClick={() => {loginSubmit(this.name, this.pwd)}}>提交</ButtonSubmit>
                        </LoginData>
                    </LoginMain>
                </LoginWrapper>
            );
        }
    }
}

const mapStatetoProps = (state) => ({
    login: state.getIn(['login', 'login'])
});

const mapDispatchToProps = (Dispatch) => {
    return {
        loginSubmit(name, pwd) {
            Dispatch(actionCreators.login(name.value, pwd.value));
        }
    };
}; 

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Login));