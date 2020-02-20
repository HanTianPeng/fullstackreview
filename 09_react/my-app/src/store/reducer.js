import { CHANGE_INPUT_VALUE, SUBMIT_INPUT_VALUE, DELETE_LIST_ITEM, INIT_LIST_VALUE } from './actionTypes.js';
const defaultState = {
    inputValue: "",
    list: []
};

// reducer 可以接受state,但是绝不能修改state
export default (state = defaultState, action) => {
    if(action.type === CHANGE_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }else if(action.type === SUBMIT_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = "";
        return newState;
    }else if(action.type === DELETE_LIST_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }else if(action.type === INIT_LIST_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.list;
        return newState;
    }
    return state;
}