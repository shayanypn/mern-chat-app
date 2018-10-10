import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { USER, ROOM } from '../actions';
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
	render(){
		const { match, room } = this.props;


		return (
			<nav className="col-md-2 bg-light sidebar">
				<div className="sidebar__logo">
					<Link to={`${match.path}/`}>
						LOGO
					</Link>
				</div>
				<div className="sidebar__chatlist">
					<ul className="sidebar__chatlist__list">
						{room.map((x, index) =>{
							return (<li className={`sidebar__chatlist__list__li ${x.active ? 'sidebar__chatlist__list__li--active' : ''}`}
								onClick={e=> this.onRoomClick(x)}
								key={index}>{x.name}</li>);
						})}
					</ul>
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