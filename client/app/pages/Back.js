import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../socket';
import { CHATROOM, ROOM, CHANNEL } from './../actions';



import Setting from './back/Setting';
import Dashboard from './back/Dashboard';
import AddChatUser from './back/AddChatUser';
import ChatDetail from './back/ChatDetail';
import Room from './back/Room';
import Channel from './back/Channel';
import RoomDetail from './back/RoomDetail';
import BackSidebar from './../components/BackSidebar';
import BackNavbar from './../components/BackNavbar';

class Back extends React.Component {
	constructor(props){
		super(props);
		// socket.on('get_chatroom', (error,result) => {
		// 	if (result) {
		// 		this.props.dispatch(CHATROOM.update(result));
		// 	};
		// });
		socket.on('authenticate', (result, error) => {
			if (result) {
				console.log(result);
				this.loadDefault();
			}
			if (error) {
				console.log('authenticate problem' , error);
			}
		});
		socket.on('get_room', (result, error) => {
			if (result) {
				this.props.dispatch({
					type: ROOM.UPDATE,
					rooms: result
				});
			};
		});
		

		socket.on('get_room_channel', (result, error) => {
			if (result) {
				this.props.dispatch({
					type: CHANNEL.UPDATE,
					channels: result
				});
			};
		});
		socket.on('get_room_channel', (result, error) => {
			if (result) {
				socket.emit('get_room_channel');
			}
		});
	}
	componentDidMount(){
		const { user } = this.props;
		socket.emit('authenticate', {
			username: user.username,
			token: user.token,
		});
	}

	loadDefault(){
		socket.emit('get_room');
	}

	render(){
		const { match } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<BackSidebar />
					<main role="main" className="col-md-10 col-lg-10 nopadding">
						<BackNavbar />
						<div className="col">
							<Route exact path={`${match.path}/`} component={Dashboard} />
							<Route path={`${match.path}/room`} component={Room} />
							<Route path={`${match.path}/channel`} component={Channel} />
							<Route path={`${match.path}/room-detail`} component={RoomDetail} />
							<Route path={`${match.path}/add-user`} component={AddChatUser} />
							<Route path={`${match.path}/chat-detail`} component={ChatDetail} />
							<Route path={`${match.path}/setting`} component={Setting} />
						</div>
					</main>
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Back));