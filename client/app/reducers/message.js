import { MESSAGE } from '../actions';

function model(state = [], action) {
	switch (action.type) {
		case MESSAGE.UPDATE:
			return action.data || [];
		case MESSAGE.EDIT:
			return state.map( x => {
				if (x._id === action.id) {
					x.text = action.message;
				}
				return x;
			});
		default:
			return state
	}
}

export default model;