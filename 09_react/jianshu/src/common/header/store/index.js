import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';

// 保证store引入的时候统一入口
export { reducer, actionCreators, constants };