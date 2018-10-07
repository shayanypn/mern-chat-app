import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class TopNavbar extends React.Component {
	render(){
		const { match, user } = this.props;

		return (
			<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
				<h5 className="my-0 mr-md-auto font-weight-normal">Chat App</h5>
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link to={`/`} className="nav-link">Home</Link>
					</li>
					<li className="nav-item">
						<Link to={`/about-us`} className="nav-link">About Us</Link>
					</li>
					<li className="nav-item">
						<Link to={`/blog`} className="nav-link">Blog</Link>
					</li>
					{user.isAuthenticate ? <li className="nav-item">
						<Link to={`/app`} className="btn btn-info">Dashboard</Link>
					</li> : '' }
					{user.isAuthenticate ? '' : <li className="nav-item">
						<Link to={`/signin`} className="btn btn-outline-success mr-2">Sign In</Link>
					</li>}
					{user.isAuthenticate ? '' : <li className="nav-item">
						<Link to={`/signup`} className="btn btn-outline-primary">Sign up</Link>
					</li>}
				</ul>
			</div>
		)
	}
}


function getState(state){
	return {
		user: state.user,
		state
	};
}

export default withRouter(connect(getState)(TopNavbar));