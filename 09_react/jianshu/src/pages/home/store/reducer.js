import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: []
});

export default (state=defaultState, action) => {
    switch(action.type){
        case constants.changeHomeData:
            return state.merge({
                topicList: action.topicList,
                articleList: action.articleList,
                recommendList: action.recommendList
            });
        default:
            return state;
    }
}