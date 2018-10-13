import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'
import { USER, ROOM, CHANNEL } from '../actions';
import { socket } from './../socket';

class BackSidebar extends React.Component {
	constructor(props){
		super(props);
	}
	onLogout(){
		const { user } = this.props;
		this.props.dispatch(USER.delete(user.token));
	}
	onRoomClick(room){
		if (!room || !room._id) {
			return;
		}
		this.props.dispatch({
			type: ROOM.ACTIVE,
			id: room._id
		});
		socket.emit('get_room_channel', {
			room_id: room._id
		});
	}
	onClickChannel(room, channel){
		if (!room || !room._id || !channel || !channel._id) {
			return;
		}
		this.props.dispatch({
			type: CHANNEL.ACTIVE,
			id: channel._id
		});
		socket.emit('get_channel_message', {
			room: room._id,
			channel: channel._id
		});
		this.props.history.push('/app/');
	}


	render(){
		const { match, room, channel } = this.props;
		const activeRoom = room.find(x => x.active);


		return (
			<nav className="col-4 bg-light sidebar">
				<div className="sidebar__room">
					<ul className="sidebar__room__list">
						{room.map((x, index) =>{
							return (<li className={`sidebar__room__list__li ${x.active ? 'sidebar__room__list__li--active' : ''}`}
								onClick={e=> this.onRoomClick(x)}
								key={index}><Ionicon icon="md-radio-button-off" fontSize="40px" /></li>);
						})}
						<li className="sidebar__room__list__li mt-3" >
							<Link to={`${match.path}/room`}>
								<Ionicon icon="ios-add-circle-outline" fontSize="40px"  />
							</Link>
						</li>
					</ul>

					<ul className="sidebar__room__actionbar">
						<li>
							<Link to={`${match.path}/setting`} className="nav-link" >
								<Ionicon icon="ios-cog" />
							</Link>
						</li>
						<li onClick={this.onLogout.bind(this)}>
							<Ionicon icon="ios-power" />
						</li>
					</ul>
				</div>
				<div className="sidebar__channel">
					<div className="sidebar__channel__title">
						<h4>{activeRoom ? activeRoom.name : ''}</h4>
					</div>
					<div className="sidebar__channel__add text-right">
						{activeRoom ? (<Link to={`${match.path}/channel`}>add new channel<Ionicon icon="md-add-circle" /></Link>) : ''}
					</div>
					<ul className="sidebar__channel__list nopadding">
						{channel.map((x,index) =>{
							return (<li className={`sidebar__channel__list__li ${x.active ? 'sidebar__channel__list__li--active' : ''}`}
									onClick={e => this.onClickChannel(activeRoom, x)} key={index}>{x.name}</li>)
						})}
					</ul>
				</div>
			</nav>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(BackSidebar));