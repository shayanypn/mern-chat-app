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


	console.log('error', error);

	return action;
};

export const DEFAULT = 'DEFAULT';
export const SIDEBAR = 'SIDEBAR';

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
	AVATAR: 'USER_AVATAR',
	delete: (token) => {
		axios.delete(`${SERVER}/token/${token}`)
		.then( response => {
		})
		return {
			type: USER.LOGOUT
		};
	},
	updateAvatar: (data) => {
		return (dispatch) => {
			return axios.put(`${SERVER}/user/avatar`,{
				avatar: data.avatar
			},{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': data.token
				}
			})
			.then(function (response) {
				dispatch(LOADING.apply('form_login', false,{
					type: USER.LOGIN,
					avatar: data.avatar
				}));
			})
			.catch( error => {
				dispatch(LOADING.apply('form_login', false), HTTPHandler(error));
			});
		}
	},
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
	EDIT: 'MESSAGE_EDIT',
	ADDLIST: 'MESSAGE_ADDLIST',
	ACTIVE: 'MESSAGE_ACTIVE',
	DECTIVE: 'MESSAGE_DECTIVE'
}


