import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';


const changeHomeData = (homeData) => ({
    type: constants.changeHomeData,
    topicList: fromJS(homeData.topicList),
    articleList: fromJS(homeData.articleList),
    recommendList: fromJS(homeData.recommendList)
});

export const initHomedata = () => {
    return (Dispatch) => {
        axios.get("/api/homeData.json").then((res) => {
            Dispatch(changeHomeData(res.data.homeData));
        }).catch((err) => {
            console.log('get home data error');
        });
    }
};