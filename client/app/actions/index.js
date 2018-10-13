import axios from 'axios';
import { SERVER } from '../config';

/*** * * * * * * * * * * 
 * 		HELPERS
* * * * * * * * * * ***/
const HTTPHandler = function(error){
	let action = {
		type: 'NOACTION'
	},
	status = 0;


	if (error && error.response && error.response.status) {
		status = error.response.status;
	}


	switch(status){
		case 401:
			action = {type: 'LOGOUT'};
			break;
	}


	console.log('error', error, action);

	return action;
};

export const LOADING = {
	LOADING: 'LOADING',
	apply: (key, status, next_action) => {	

		return (dispatch) => {
			const actions = [{
				type: LOADING.LOADING,
				key: key,
				status: status 
			}];
			if (next_action) {actions.push(next_action);};
			dispatch(actions);
		}
	}
};


/*** * * * * * * * * * * 
 * 		USER
* * * * * * * * * * ***/

export const USER = {
	LOGIN: 'LOGIN',
	CHECKTOKEN: 'CHECKTOKEN',
	LOGOUT: 'LOGOUT',
	post: (data) => {
		return (dispatch) => {
			return axios.post(`${SERVER}/token`,{
				username: data.username,
				password: data.password
			},{
				headers: { 'Content-Type': 'application/json' }
			})
			.then(function (response) {
				var token = Object.assign({},response.data,data);
				dispatch(LOADING.apply('form_login', false,{
					type: USER.LOGIN,
					token
				}));
			})
			.catch( error => {
				dispatch(LOADING.apply('form_login', false), HTTPHandler(error));
			});
		}
	},
	create: (data) => {
		return (dispatch) => {
			return axios.post(`${SERVER}/signup`,{
				username: data.username,
				password: data.password
			},{
				headers: { 'Content-Type': 'application/json' }
			})
			.then(function (response) {

				// var token = Object.assign({},response.data,data);
				// dispatch(LOADING.apply('form_login', false,{
				// 	type: USER.LOGIN,
				// 	token
				// }));
			})
			.catch( error => {
				dispatch(LOADING.apply('form_register', false), HTTPHandler(error));
			});
		}
	},
	delete: (token) => {
		axios.delete(`${SERVER}/token/${token}`)
		.then( response => {
		})
		return {
			type: USER.LOGOUT
		};
	}
}

/*** * * * * * * * * * * 
 * 		ROOM
* * * * * * * * * * ***/
export const ROOM = {
	LIST: 'ROOM_LIST',
	UPDATE: 'ROOM_UPDATE',
	ADDLIST: 'ROOM_ADDLIST',
	ACTIVE: 'ROOM_ACTIVE',
	DECTIVE: 'ROOM_DECTIVE'
}

/*** * * * * * * * * * * 
 * 		CHANNEL
* * * * * * * * * * ***/
export const CHANNEL = {
	LIST: 'CHANNEL_LIST',
	UPDATE: 'CHANNEL_UPDATE',
	ADDLIST: 'CHANNEL_ADDLIST',
	ACTIVE: 'CHANNEL_ACTIVE',
	DECTIVE: 'CHANNEL_DECTIVE'
}

/*** * * * * * * * * * * 
 * 		MESSAGE
* * * * * * * * * * ***/
export const MESSAGE = {
	LIST: 'MESSAGE_LIST',
	UPDATE: 'MESSAGE_UPDATE',
	ADDLIST: 'MESSAGE_ADDLIST',
	ACTIVE: 'MESSAGE_ACTIVE',
	DECTIVE: 'MESSAGE_DECTIVE'
}


