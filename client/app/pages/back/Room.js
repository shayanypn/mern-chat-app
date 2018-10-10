import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';
import { CHATROOM } from './../../actions';

import Card from './../../components/Card';

class Room extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			timer: null,
			users: []
		};

		// socket.on('add_chatroom', (result, error) => {
		// 	if (result && result.state === 201) {
		// 		this.setState({
		// 			redirect: true
		// 		});
		// 	}
		// 	if (error) {
		// 		// TODO
		// 	};
		// })
		// socket.on('search_user', (error,result) => {
		// 	if (result) {
		// 		this.setState({
		// 			users: result
		// 		});
		// 	}
		// })
	}
	onSubmit(){
		socket.emit('add_room', {
			name: this.room_name.value
		});
		// this.props.history.push('/app/chat-detail');
	}


	// onSearch() {
	// 	clearTimeout(this.state.timer);
	// 	const timer = setTimeout(()=>{
	// 		socket.emit('search_user', {
	// 			username: this.username.value
	// 		});
	// 	}, 200);

	// 	this.setState({
	// 		timer: timer
	// 	});
	// }
	// onClick(user){
	// 	socket.emit('add_chatroom', user)
	// }

	render(){
		return (
			<div className="row justify-content-md-center">
				<Card title="Add Chat" parentClass="col-8">
					<form onSubmit={e => e.preventDefault() } >
						<div className="form-group">
							<label>Room Name</label>
							<input type="text"
								className="form-control" placeholder="room name" 
								ref={el => this.room_name=el}
								/>
						</div>
						<div className="form-group">
							<button type="button"
								className="btn btn-primary"
								onClick={this.onSubmit.bind(this)}
								>add</button>
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

export default withRouter(connect(getState)(Room));