import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'

class TopNavbar extends React.Component {
	render(){
		const { match, user } = this.props;

		return (
			<div className="container">
				<div className="nav-scroller py-1 mb-2">
					<nav className="navbar navbar-expand-sm pr-0">
						<div className="row" style={{width: '100%'}}>
							<div className="col-12 col-sm-3 col-md-2 p-0">
								<a className="navbar-brand p-0" href="#">
									<img src="https://dummyimage.com/100x45/4d394b/fff" />
								</a>
								<button className="navbar-toggler p-0 float-right" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
									<Ionicon icon="md-menu" fontSize="40px"  />
								</button>
								{user.isAuthenticate ? <Link to={`/app`}><button className="btn btn-info mr-2 float-right d-block d-sm-none d-md-none">Dashboard</button></Link> : '' }
								{user.isAuthenticate ? '' : <Link to={`/signin`}><button className="btn btn-outline-success mr-2 float-right d-block d-sm-none d-md-none">Sign In</button></Link>}
							</div>
							<div className="col-12 col-sm-5 col-md-7 p-0">
								<div className="collapse navbar-collapse" id="navbarsExample03">
									<ul className="navbar-nav mr-auto">
										<li className="nav-item">
											<Link to={`/`} replace className="nav-link">Home</Link>
										</li>
										<li className="nav-item">
											<Link to={`/about-us`} replace className="nav-link">About Us</Link>
										</li>
										<li className="nav-item">
											<Link to={`/blog`} replace className="nav-link">Blog</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-sm-4 col-md-3 p-0 text-center">
								<div className="d-none d-sm-block d-md-block ">
									{user.isAuthenticate ? <Link to={`/app`}><button className="btn btn-info">Dashboard</button></Link> : '' }
									{user.isAuthenticate ? '' : <Link to={`/signin`} replace><button className="btn btn-outline-success mr-2">Sign In</button></Link>}
									{user.isAuthenticate ? '' :<Link to={`/signup`} replace><button className="btn btn-outline-primary">Sign up</button></Link>}
								</div>
							</div>
						</div>
					</nav>
				</div>
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