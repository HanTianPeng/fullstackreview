import React from 'react';
import ReactDOM from 'react-dom';
// import Demo from './Demo';
// import Girl from './girl.js';
// import TodoList from './TodoList.js';
import TodoListDemo from './TodoListDemo.js';
import { Provider } from 'react-redux';
import store from './store';


const APP = (
    <Provider store={store}>
        <TodoListDemo />
    </Provider>
);

ReactDOM.render(
    // JSX语法：必须引入react模块, 所以上面引入react模块看似没用，实质是必须引入的
    // <TodoList />,

    APP,
    document.getElementById('root')
);
