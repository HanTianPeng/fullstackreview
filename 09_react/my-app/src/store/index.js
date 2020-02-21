import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';
// import ReduxThunk from 'redux-thunk';
import TodoListSaga from './sagas.js';
import createSagaMiddleware from 'redux-saga';


/*
    store是唯一的
    只有store能改变自己的内容
    reducer必须是纯函数(给定固定的输入,就一定会有固定的输出,而且不会有副作用)
*/
// const store = createStore(
//     reducer, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// Redux Thunk github
// const store = createStore(
//     reducer,
//     applyMiddleware(ReduxThunk)
// );

// Redux-devtools-extension github
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...[ReduxThunk]),
//   // other store enhancers if any
// );
// const store = createStore(reducer, enhancer);

// Redux-saga  github
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
    applyMiddleware(...[sagaMiddleware])
);
const store = createStore(reducer, enhancer);
sagaMiddleware.run(TodoListSaga);

export default store;