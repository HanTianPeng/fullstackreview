const defaultState = {
    focused: false
};

export default (state=defaultState, action) => {
    if(action.type === 'search_focus') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.focused = true;
        return newState;
    }else if(action.type === 'search_blur') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.focused = false;
        return newState;
    }
    return state;
};