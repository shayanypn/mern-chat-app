import axios from 'axios';
import { SERVER } from '../config';

export const ADD_MODEL = 'ADD_MODEL';

export function addModel(text) {

	return (dispatch) => {
		axios.get(SERVER)
		.then( response => {
			dispatch({
				type: ADD_MODEL,
				text
			});
		})
	}
}