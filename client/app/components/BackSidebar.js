import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { USER } from '../actions';

class BackSidebar extends React.Component {
	onLogout(){
		this.props.dispatch({type: USER.LOGOUT});
	}

	render(){
		const { match } = this.props;

		return (
			<nav className="col-md-2 d-none d-md-block bg-light sidebar">
				<div className="sidebar__logo">
					<Link to={`${match.path}/`}>
						LOGO
					</Link>
				</div>
				<div className="sidebar__chatlist">
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
	return {
		user: state.user,
		state
	};
}

export default withRouter(connect(getState)(BackSidebar));