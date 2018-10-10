import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';

import Card from './../../components/Card';

class ChatDetail extends React.Component {
	constructor(props){
		super(props);
	}
	onSend() {
		const { chat_room, user } = this.props;
		const chatroom = chat_room.find(x=> x.active);
		const message = {
			user: chatroom._doc.joinedUser,
			chatroom: chatroom.id,
			text: this.message.value,
		};

		if (message.text.length) {
			socket.emit('add_message', message);
		};
	}
	render(){

		return (
			<div className="row">
				<div className="col">
					<div className="row">
						<div className="col">
							<br /><br />
							<br /><br />
							<br /><br />
							<br /><br />
						</div>
					</div>
					<div className="row">
						<div className="col-10">
							<textarea className="form-control"
								ref={el => this.message=el}  />
						</div>
						<div className="col-2">
							<button 
								onClick={this.onSend.bind(this)}
								className="btn btn-primary" type="button">Send</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(ChatDetail));