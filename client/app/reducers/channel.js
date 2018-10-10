import { CHANNEL } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case CHANNEL.UPDATE:
			return action.channels.map(x=>{
				x.active = false;
				return x;
			}) || [];
		case CHANNEL.ACTIVE:
			return state.map( x => {
				x.active = x._id == action.id ? true : false;
				return x;
			});
		case CHANNEL.DECTIVE:
			return state.map( x => {
				x.active = false;
				return x;
			});
		default:
			return state
	}
}

export default model;