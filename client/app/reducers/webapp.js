import { LOADING, SIDEBAR } from '../actions';

const defaultState = {
	sidebar: false,
	isloading: false,
	loading: {
		form_login: false,
		form_transaction: false
	}
};

function webapp(state = defaultState, action) {
	switch (action.type) {
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