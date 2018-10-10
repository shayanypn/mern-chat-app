import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import room from './room';
import channel from './channel';

const rootReducer = combineReducers({
	loading,
	user,
	room,
	channel,
});

export default rootReducer;