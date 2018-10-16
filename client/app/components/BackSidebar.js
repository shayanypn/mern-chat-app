import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'
import { SIDEBAR, USER, ROOM, CHANNEL } from '../actions';
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
		const { location } = this.props;
		if (!room || !room._id || !channel || !channel._id) {
			return;
		}
		this.props.dispatch({
			type: CHANNEL.ACTIVE,
			room_id: room._id,
			channel_id: channel._id
		});
		socket.emit('get_channel_message', {
			room: room._id,
			channel: channel._id
		});
		if (location.pathname !== '/app/') {
			this.props.history.push('/app/');
		}
	}
	onToggleSidebar(){
		const { webapp } = this.props;
		this.props.dispatch({
			type: SIDEBAR,
			status: !webapp.sidebar
		});
	}
	render(){
		const { match, room, channel, webapp } = this.props;
		const activeRoom = room.find(x => x.active);
		
		return (
			<nav className={`col-4 col-sm-5 col-md-4 col-lg-3 bg-light sidebar ${webapp.sidebar ? 'active' : ''}`}>
				<div className="sidebar__room">
					<ul className="sidebar__room__list">
						{room.map((x, index) =>{
							return (<li className={`sidebar__room__list__li ${x.active ? 'sidebar__room__list__li--active' : ''}`}
								onClick={e=> this.onRoomClick(x)}
								key={index}><img src={x.avatar} style={{width:40, height:40}} className="rounded-circle" /></li>);
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
					<div className="sidebar__channel__toggle d-block d-sm-none d-lg-none"
						onClick={this.onToggleSidebar.bind(this)}>
						<Ionicon icon="ios-arrow-dropleft-circle" fontSize="30px"  /> Close Sidebar
					</div>
					<div className="sidebar__channel__title">
						<h4>{activeRoom ? activeRoom.name : ''}</h4>
					</div>
					<div className="sidebar__channel__add">
						{activeRoom ? (<Link to={`${match.path}/channel`}>Channels <Ionicon icon="md-add-circle" /></Link>) : ''}
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