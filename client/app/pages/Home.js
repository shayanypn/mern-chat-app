import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';

class Home extends React.Component {


	render(){

		return (
			<div>
				<TopNavbar />
				<div className="container">
					<div className="jumbotron text-center">
						<h1 className="display-4">Well come!</h1>
						<p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
						<hr className="my-4" />
						<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
					</div>
					<Footer />
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

export default withRouter(connect(getState)(Home));