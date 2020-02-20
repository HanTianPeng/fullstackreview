import React from 'react';
import ReactDOM from 'react-dom';
// import Demo from './Demo';
// import Girl from './girl.js';
import TodoList from './TodoList.js';


ReactDOM.render(
    // JSX语法：必须引入react模块, 所以上面引入react模块看似没用，实质是必须引入的
    <TodoList />,
    document.getElementById('root')
);
