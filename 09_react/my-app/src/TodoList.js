import React, { Component } from 'react';
import "antd/dist/antd.css";
import store from './store/index.js';
import TodoListUI from './TodoListUI.js';
// import axios from 'axios';
// import { getTodoListAction, getChangeInputAction, getSubmitInputAction, getDeleteListItemAction } from './store/actionCreators';
import { getToListSagaAction, getChangeInputAction, getSubmitInputAction, getDeleteListItemAction } from './store/actionCreators';

// import { CHANGE_INPUT_VALUE, SUBMIT_INPUT_VALUE, DELETE_LIST_ITEM } from './store/actionTypes.js';


class TodoList extends Component {
    constructor(props) {
        super(props);
        /*初始化state:  ???这块有疑问
            componentWillMount() {
                store.subscribe((state) => this.setState(state));
            }
        */
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        // 订阅store的改变
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
            <TodoListUI 
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleButtonClick={this.handleButtonClick}
                handleDeleteItem={this.handleDeleteItem}
                handleChange={this.handleChange}
            />
            );
    }

    componentDidMount() {
        // axios.get('/api/mock_data')
        //     .then((res) => {
        //         const initValueList = res.data.data;
        //         const action = getInitListAction(initValueList);
        //         store.dispatch(action);
        //     })
        //     .catch();

        // Redux-thunk
        // const action = getTodoListAction();

        const action = getToListSagaAction();
        store.dispatch(action);
    }

    handleChange(e) {
        const action = getChangeInputAction(e.target.value);
        store.dispatch(action);
    }

    handleStoreChange() { 
        this.setState(store.getState());
    }

    handleButtonClick() {
        const action = getSubmitInputAction();
        store.dispatch(action);
    }

    handleDeleteItem(index) {
        const action = getDeleteListItemAction(index);
        store.dispatch(action);
    }
}

export default TodoList;
