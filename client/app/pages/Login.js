import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { USER, LOADING } from '../actions';
import { SERVER } from '../config';
import toastr from 'reactjs-toastr';

import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

class Login extends React.Component {
	onSubmit() {
		axios.post(`${SERVER}/token`,{
			username: this.username.value,
			password: this.password.value
		},{
			headers: { 'Content-Type': 'application/json' }
		})
		.then( response => {
			this.props.dispatch({
				type: USER.LOGIN,
				token: response.data
			});
		})
		.catch( (error, e1) => {
			if (error.response.status === 401) {
				toastr.error('Username or password is not valid!');
			}else{
				toastr.error(error.response.message);
			}
		});
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