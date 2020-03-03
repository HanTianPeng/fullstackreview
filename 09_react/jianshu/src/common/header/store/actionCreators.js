import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';


const renderList = (data) => ({
    type: constants.GET_LIST,
    data: fromJS(data),
    totalPage: fromJS(Math.ceil(data.length / 5))
});

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
});

export const getList = () => {
    return (Dispatch) => {
        axios.get('/api/headerList.json')
            .then((res) => {
                const data = res.data.list;
                Dispatch(renderList(data));
            })
            .catch(() => {
                console.log('---error---');
            });
    };
};

export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
    type: constants.MOUSE_LEAVE
});

export const changeList = (page) => ({
    type: constants.CHANGE_LIST,
    page: page
});

