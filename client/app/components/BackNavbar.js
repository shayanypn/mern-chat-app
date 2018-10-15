import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'
import { SIDEBAR, USER } from '../actions';
import { socket } from './../socket';

class BackNavbar extends React.Component {
	onToggleSidebar(){
		const { webapp } = this.props;
		this.props.dispatch({
			type: SIDEBAR,
			status: !webapp.sidebar
		});
	}
	render(){
		const { match, room } = this.props;
		return (
			<nav className="navbar navbar-expand navbar-light bg-light mb-3">
				<button className="btn btn--sidebar d-block d-sm-none d-lg-none p-0 float-right" type="button" 
						onClick={this.onToggleSidebar.bind(this)}>
					<Ionicon icon="md-menu" fontSize="40px"  />
				</button>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to={`${match.path}/`}>Home</Link>
					</li>
				</ul>
			</nav>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(BackNavbar));