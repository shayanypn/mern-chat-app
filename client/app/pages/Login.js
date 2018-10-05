import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Login extends React.Component {


	render(){

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="card">
						  <div className="card-body">
						    This is some text within a card body.
						  </div>
						</div>
					</div>
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

export default withRouter(connect(getState)(Login));