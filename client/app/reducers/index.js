import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import chat_room from './chat_room';

const rootReducer = combineReducers({
	loading,
	user,
	chat_room,
});

export default rootReducer;