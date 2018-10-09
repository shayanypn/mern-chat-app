import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from './../../components/Card';
import { socket } from './../../socket';

class AddChatUser extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			timer: null,
			users: []
		};

		socket.on('add_chatroom', (error,result) => {
			console.log(error,result);
		})
		socket.on('search_user', (error,result) => {
			if (result) {
				console.log(result);
				this.setState({
					users: result
				})
			}
		})
	}

	onSearch() {

		clearTimeout(this.state.timer);
		const timer = setTimeout(()=>{
			socket.emit('search_user', {
				username: this.username.value
			});
		}, 200);

		this.setState({
			timer: timer
		});
	}
	onClick(user){
		socket.emit('add_chatroom', user)
	}

	render(){
		return (
			<div className="row justify-content-md-center">
				<Card title="Add Chat" parentClass="col-8">
					<form onSubmit={e => e.preventDefault() } >
						<div className="form-group">
							<label>Username</label>
							<input type="email"
								className="form-control" placeholder="search user by their username" 
								onKeyPress={this.onSearch.bind(this)}
								ref={el => this.username=el}
								/>
						</div>
						<div className="form-group">
							<div className="list-group">
								{this.state.users.map((x,index) => {
									return (<button key={{index}} type="button"
										onClick={e => this.onClick(x)}
										className="list-group-item list-group-item-action">
										{x.name}  | {x.username}
									</button>)
								})}
							</div>
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