import { ROOM } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case ROOM.UPDATE:
			return action.rooms.map(x=>{
				x.active = false;
				return x;
			}) || [];
		case ROOM.ACTIVE:
			return state.map( x => {
				x.active = x._id == action.id ? true : false;
				return x;
			});
		case ROOM.DECTIVE:
			return state.map( x => {
				x.active = false;
				return x;
			});
		default:
			return state
	}
}

export default model;