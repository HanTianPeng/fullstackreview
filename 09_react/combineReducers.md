### combineReducers源码分析

#### combineReducers作用就是管理多个reducer函数的,从而达到模块化开发

```js
export default combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for(let i=0; i<reducerKeys.length; i++>) {
        const key = reducerKeys[i];

        if(typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }

    const finalReducerKeys = Object.keys(finalReducers);
    return function combination(state={}, action) {
        let hasChanaged = false;
        const nextState = {};

        for(let i=0; i<finalReducerKeys.length; i++>) {
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const perviousStateForKey = state[key];
            const nextStateForKey = reducer(perviousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== perviousStateForKey;
        }
        return hasChanged ? nextState: state;
    }
}
```