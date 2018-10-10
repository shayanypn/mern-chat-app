import { CHATROOM } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case CHATROOM.ADDLIST:
			return action.data.map(x=>{
				x.active = false;
				return x;
			}) || [];
		default:
			return state
	}
}

export default model;