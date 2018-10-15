import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { USER, LOADING } from '../actions';

import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

class Login extends React.Component {
	onSubmit() {

		this.props.dispatch(USER.post({
			username: this.username.value,
			password: this.password.value
		}));
	}

	render(){
		return (
			<div>
				<TopNavbar />
				<div className="container">
					<div className="row justify-content-center">
						<Card title="Sign In" parentClass="col-12 col-sm-8 col-md-5 mb-5" cardClass="bg-light">
							<form onSubmit={e => e.preventDefault() } >
								<div className="form-group">
									<label>Email address</label>
									<input type="email" ref={el => this.username=el} className="form-control" placeholder="Enter email" />
									<small className="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input type="password" ref={el => this.password=el} className="form-control" placeholder="Password" />
								</div>
								<div className="form-group form-check">
									<input type="checkbox" className="form-check-input" />
									<label className="form-check-label">Check me out</label>
								</div>
								<button
									onClick={this.onSubmit.bind(this)}
									className="btn btn-primary">Sing In</button>
							</form>
						</Card>
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

export default withRouter(connect(getState)(Login));