import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Setting from './back/Setting';
import Dashboard from './back/Dashboard';
import BackSidebar from './../components/BackSidebar';

class Back extends React.Component {
	render(){
		const { match } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<BackSidebar />
					<main role="main" className="col-md-10 col-lg-10">
						<Route exact path={`${match.path}/`} component={Dashboard} />
						<Route path={`${match.path}/setting`} component={Setting} />
					</main>
				</div>
			</div>
		)
	}
}


function getState(state){
	return {
		state
	};
}

export default withRouter(connect(getState)(Back));