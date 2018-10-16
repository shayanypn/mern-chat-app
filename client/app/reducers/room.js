import Cookie from '../utils/cookie';
import { ROOM } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case ROOM.UPDATE:
			return action.data.map(x => {
				x.active = x._id == action.active ? true : false;
				return x;
			}) || [];
		case ROOM.ACTIVE:
			const _cookie = Cookie.get('cr');
			let _cookieObj = {},
			channel_id = null

			if ( _cookie !== '' ) {
				_cookieObj = JSON.parse( _cookie );
			}

			if (typeof _cookieObj === 'object' && _cookieObj.c) {
				channel_id = _cookieObj.c;
			}

			Cookie.set('cr', JSON.stringify({
				'r': action.id,
				'c': channel_id
			}), 6 );

			return state.map( x => {
				x.active = x._id == action.id ? true : false;
				return x;
			});
		case ROOM.DECTIVE:
			Cookie.set('cr', '', 6);
			return state.map( x => {
				x.active = false;
				return x;
			});
		default:
			return state
	}
}

export default model;