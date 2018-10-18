import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { subscribe } from 'redux-subscriber';
import toastr from 'reactjs-toastr';
import { socket } from './socket';
import { USER, ROOM, CHANNEL, MESSAGE } from './actions';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Back from './pages/Back';

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		};
		socket.on('authenticate', (result, error) => {
			if (result && result.status === 200) {
				this.props.dispatch({
					type: USER.AVATAR,
					avatar: result.avatar
				});
				socket.emit('get_room');
			} else if(result && result.status === 401) {
				toastr.error('Authenticate problem, please login again');
				this.onLogout();
			} else if(result) {
				console.log('authenticate problem' , error);
			}

			if (error && error.status === 401) {
				this.onLogout();
			} else if(error) {
				console.log('authenticate problem' , error);
			}
		});
		socket.on('get_room', (result, error) => {
			if (result) {
				const { webapp } = this.props;
				const activeRoom = result.find(x=>x._id === webapp.room);
				this.props.dispatch({
					type: ROOM.UPDATE,
					active: webapp.room,
					data: result
				});
				if (activeRoom) {
					socket.emit('get_room_channel', {
						room_id: activeRoom._id
					});
				}
			}
			if (error) {console.log('get_room' , error);}
		});
		socket.on('add_room', (result, error) => {
			if (result) {
				toastr.success('new room added successfully');
				socket.emit('get_room');
			}
			if (error) {console.log('add_room' , error);}
		});
		socket.on('get_room_channel', (result, error) => {
			if (result) {
				const { webapp, room } = this.props;
				const activeRoom = room.find(x=>x._id === webapp.room);
				const activeChannel = result.find(x=>x._id === webapp.channel);
				this.props.dispatch({
					type: CHANNEL.UPDATE,
					active: webapp.channel,
					data: result
				});
				if (activeChannel) {
					socket.emit('get_channel_message', {
						room: activeRoom._id,
						channel: activeChannel._id
					});
				}
			}
			if (error) {console.log('get_room_channel' , error);}
		});
		socket.on('add_room_channel', (result, error) => {
			if (result) {
				toastr.success('new channel added successfully');
				this.loadRoomChannel();
			}
			if (error) {console.log('add_room_channel' , error);}
		});

		socket.on('get_channel_message', (result, error) => {
			if (result) {
				this.props.dispatch({
					type: MESSAGE.UPDATE,
					data: result
				});
			}
			if (error) {console.log('get_channel_message' , error);}
		});
		socket.on('update_message', (result, error) => {
			if (result) {
				toastr.success('message updated successfully');
			}
			if (error) {console.log('update_message' , error);}
		});
		socket.on('delete_message', (result, error) => {
			if (result) {
				toastr.success('message deleted successfully');
			}
			if (error) {console.log('update_message' , error);}
		});
	}
	loadRoomChannel(){
		const { room } = this.props;
		const activeRoom = room.find(x => x.active);
		if (activeRoom) {
			socket.emit('get_room_channel', {
				room_id: activeRoom._id
			});
		}
	}
	componentDidMount(){
		this.props.dispatch({type: USER.CHECKTOKEN});
	}
	onLogout(){
		const { user } = this.props;
		this.props.dispatch(USER.delete(user.token));
	}
	loading(mode){
		this.setState({
			isLoading: mode
		});
	}
	render() {
		const { user, loading, observer } = this.props;
		const unsubscribe = observer(
			state => ({ webapp: state.webapp.isloading }),
			(state, oldState) => {
				this.loading(state);
			},
		)

		return (
			<div>
				{ this.state.isLoading ? <div className="bx-loading">
					<div className="spinner">
						<div className="bounce1"></div>
						<div className="bounce2"></div>
						<div className="bounce3"></div>
					</div>
				</div>:''}
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/signin' render={ () => ( user.isAuthenticate ? <Redirect to='/app' /> : <Login />) }/>
					<Route path='/signup' render={ () => ( user.isAuthenticate ? <Redirect to='/app' /> : <Register />) }/>
					<Route path='/about-us' component={AboutUs}/>
					<Route path='/blog' component={Blog}/>
					<Route path='/app' render={ () => ( user.isAuthenticate ? <Back /> : <Redirect to='/signin' />) }/>
				</Switch>
			</div>
		)
	}
}

function getState(state){
	return state;
}

export default withRouter(connect(getState)(Main));
