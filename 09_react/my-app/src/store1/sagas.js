import { put, takeEvery  } from 'redux-saga/effects';
import axios from 'axios';
import { getInitListAction } from './actionCreators';
import { INIT_LIST_VALUE_SAGA } from './actionTypes';


function* initListValue() {
    try{
        const res = yield axios.get('/api/mock_data');
        console.log(res.data.data);
        const action = getInitListAction(res.data.data);
        yield put(action);
    }catch(e) {
        console.log('ajax请求后台数据异常');
    }
}

function* TodoListSaga() {
    yield takeEvery(INIT_LIST_VALUE_SAGA, initListValue);
}

export default TodoListSaga;