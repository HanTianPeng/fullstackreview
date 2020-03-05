import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';


const changeHomeData = (homeData) => ({
    type: constants.changeHomeData,
    topicList: fromJS(homeData.topicList),
    articleList: fromJS(homeData.articleList),
    recommendList: fromJS(homeData.recommendList)
});

const getNextArticleList = (articleList, nextPage) => ({
    type: constants.getNextList,
    articleList: fromJS(articleList),
    nextPage: fromJS(nextPage)
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

export const getMoreList = (nextPage) => {
    return (Dispatch) => {
        axios.get("/api/articleList.json?page=" + nextPage).then((res) => {
            Dispatch(getNextArticleList(res.data.articleList, nextPage));
        }).catch((error) => {

        });
    }
};

export const ChangeScrollTop = (isShow) => ({
    type: constants.showScrollTop,
    isShow: fromJS(isShow)
});