import Cookie from '../utils/cookie';
import { CHANNEL } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case CHANNEL.UPDATE:
			return action.data.map(x => {
				x.active = x._id == action.active ? true : false;
				return x;
			}) || [];
		case CHANNEL.ACTIVE:
			Cookie.set('cr', JSON.stringify({
				'r': action.room_id,
				'c': action.channel_id
			}), 6 );

			return state.map( x => {
				x.active = x._id == action.channel_id ? true : false;
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