import { combineReducers } from 'redux';
import user from './user';
import room from './room';
import channel from './channel';
import message from './message';
import webapp from './webapp';

const rootReducer = combineReducers({
	webapp,
	user,
	room,
	channel,
	message
});

export default rootReducer;