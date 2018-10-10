import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { USER, ROOM, CHANNEL } from '../actions';
import { socket } from './../socket';

class BackSidebar extends React.Component {
	constructor(props){
		super(props);
	}
	onLogout(){
		this.props.dispatch({type: USER.LOGOUT});
	}
	onRoomClick(room){
		this.props.dispatch({
			type: ROOM.ACTIVE,
			id: room._id
		});
		socket.emit('get_room_channel', {
			room_id: room._id
		});
	}
	onClickChannel(channel){
		this.props.dispatch({
			type: CHANNEL.ACTIVE,
			id: channel._id
		});
		socket.emit('get_channel_message', {
			channel_id: channel._id
		});
	}


	render(){
		const { match, room, channel } = this.props;
		const activeRoom = room.find(x => x.active);


		return (
			<nav className="col-4 bg-light sidebar">
				<div className="sidebar__logo">
					<Link to={`${match.path}/`}>
						LOGO
					</Link>
				</div>
				<div className="sidebar__chatlist">
					<div className="row">
						<div className="col">
							<ul className="sidebar__chatlist__list">
								{room.map((x, index) =>{
									return (<li className={`sidebar__chatlist__list__li ${x.active ? 'sidebar__chatlist__list__li--active' : ''}`}
										onClick={e=> this.onRoomClick(x)}
										key={index}>{x.name}</li>);
								})}
							</ul>
						</div>
						<div className="col">
							{activeRoom ? (<Link to={`${match.path}channel`}> <button className="btn btn-primary btn-sm"> add channel</button></Link>) : ''}
							<ul className="nopadding mt-5">
								{channel.map((x,index) =>{
									return (<li onClick={e => this.onClickChannel(x)} key={index}>{x.name}</li>)
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className="sidebar__actionbar">
					<ul className="nav flex-column">
						<li className="nav-item">
							<Link to={`${match.path}/setting`} className="nav-link" >Setting</Link>
						</li>
						<li className="nav-item bg-danger"
							onClick={this.onLogout.bind(this)}>
							<a href="javascript: void();" className="nav-link">Sign Out</a>
						</li>
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