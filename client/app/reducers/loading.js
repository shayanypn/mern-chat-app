import { LOADING } from '../actions';

const defaultState = {
	isloading: false,
	form_login: false,
	form_transaction: false
};

function loading(state = defaultState, action) {
	switch (action.type) {
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

export default loading;