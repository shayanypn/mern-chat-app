import { MESSAGE } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case MESSAGE.UPDATE:
			return action.data || [];
		default:
			return state
	}
}

export default model;