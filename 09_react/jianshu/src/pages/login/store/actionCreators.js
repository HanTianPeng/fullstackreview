import axios from 'axios';
import * as constants from './constants';

const changeLogin = (login) => ({
    type: constants.CHANGE_LOGIN,
    login: login
});

const changeLogout = (login) => ({
    type: constants.CHANGE_LOGOUT,
    login: login
});

export const logoutAction = () => {
    return (Dispatch) => {
        axios.get('/api/logout.json').then((res) => {
            Dispatch(changeLogout(res.data.login));
        }).catch((err) => {
            console.log('退出失败');
        });
    }
}


export const login = (name, pwd) => {
    return (Dispatch) => {
        axios.get('/api/login.json?name='+name+'&pwd='+pwd).then((res) => {
            Dispatch(changeLogin(res.data.login));
        }).catch((error) => {
            console.log('登录失败');
        });
    }
}