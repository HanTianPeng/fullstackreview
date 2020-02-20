import { CHANGE_INPUT_VALUE, DELETE_LIST_ITEM, SUBMIT_INPUT_VALUE, INIT_LIST_VALUE } from './actionTypes.js';

export const getChangeInputAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const getSubmitInputAction = () => ({
    type: SUBMIT_INPUT_VALUE
});

export const getDeleteListItemAction = (index) => ({
    type: DELETE_LIST_ITEM,
    index
});

export const getInitListAction = (list) => ({
    type: INIT_LIST_VALUE,
    list
});
