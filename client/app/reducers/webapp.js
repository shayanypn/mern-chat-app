import Cookie from '../utils/cookie';
import { DEFAULT, LOADING, SIDEBAR } from '../actions';

const defaultState = {
	sidebar: false,
	isloading: false,
	loading: {
		form_login: false,
		form_transaction: false
	},
	room: null,
	channel: null
};

function webapp(state = defaultState, action) {
	switch (action.type) {
		case DEFAULT:
			const _cookie = Cookie.get('cr');
			let _cookieObj = {},
			room_id = null,
			channel_id = null;

			if ( _cookie !== '' ) {
				_cookieObj = JSON.parse( _cookie );
			}

			if (typeof _cookieObj === 'object' && _cookieObj.r && _cookieObj.c) {
				room_id = _cookieObj.r;
				channel_id = _cookieObj.c;
			}

			return Object.assign({}, state, {
				room: room_id,
				channel: channel_id
			});
		case SIDEBAR:
			return Object.assign({}, state, {
				sidebar: action.status
			});
		case LOADING:
			const data = {};
			data[action.key] = (typeof action.status == 'undefined') ? true : action.status;
			const out = Object.assign(state, data);
			const isloading = Object.keys(out)
				.filter(x=> x!=='isloading')
				.map(x=>out[x])
				.reduce((a,b) => (a || b), false);
			return Object.assign(out, {isloading:isloading});
		default:
			return state
	}
}

export default webapp;