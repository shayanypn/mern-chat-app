import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import room from './room';
import channel from './channel';
import message from './message';

const rootReducer = combineReducers({
	loading,
	user,
	room,
	channel,
	message
});

export default rootReducer;