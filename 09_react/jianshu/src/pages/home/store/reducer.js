import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    isShow: false
});

const changeHomeDataR = (state, action) => {
    return state.merge({
        topicList: action.topicList,
        articleList: action.articleList,
        recommendList: action.recommendList
    });
};

const showScrollTopR = (state, action) => {
    return state.set("isShow", action.isShow);
};

const getNextListR = (state, action) => {
    return state.merge({
        articleList: state.get("articleList").concat(action.articleList),
        articlePage: action.nextPage
    });
};

export default (state=defaultState, action) => {
    switch(action.type){
        case constants.changeHomeData:
            return changeHomeDataR(state, action);
        case constants.getNextList:
            return getNextListR(state, action);
        case constants.showScrollTop:
            return showScrollTopR(state, action);
        default:
            return state;
    }
}