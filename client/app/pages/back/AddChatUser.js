import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from './../../components/Card';
import { socket } from './../../socket';

class AddChatUser extends React.Component {

	constructor(props){
		super(props);

		socket.on('search_user', (error,result) => {
			console.log('search_user' , error, result);
		})
	}

	onSearch() {

		console.log(this.password.value);
	}

	render(){
		return (
			<div className="row justify-content-md-center">
				<Card title="Add User" parentClass="col-8">
					<form onSubmit={e => e.preventDefault() } >
						<div className="form-group">
							<label>Username</label>
							<input type="email"
								className="form-control" placeholder="search user by their username" 
								ref={el => this.username=el}
								onKeyUp={this.onSearch.bind(this)}
								/>
						</div>
					</form>
				</Card>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(AddChatUser));