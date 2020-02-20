import { createStore } from 'redux';
import reducer from './reducer.js';

/*
    store是唯一的
    只有store能改变自己的内容
    reducer必须是纯函数(给定固定的输入,就一定会有固定的输出,而且不会有副作用)
*/
const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;