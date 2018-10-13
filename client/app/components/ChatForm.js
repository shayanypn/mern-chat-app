import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../socket';
import ChatMessage from './ChatMessage';

class ChatForm extends React.Component {
	constructor(props){
		super(props);
		socket.on('add_channel_message', (result, error) => {
			if (result) {
				this.onGetMessages();
			}

			if (error) {
				console.log('add_channel_message' , error);
			}
		});
	}
	onSend() {
		const { room, channel, user } = this.props;
		const activeRoom = room.find(x=> x.active);
		const activeChannel = channel.find(x=> x.active);
		const message = {
			room: activeRoom._id,
			channel: activeChannel._id,
			text: this.message.value,
		};
		if (message.room && message.channel && message.text.length) {
			socket.emit('add_channel_message', message);
			this.message.value = '';
		}
	}
	onGetMessages(){
		const { room, channel } = this.props;
		const activeRoom = room.find(x=> x.active);
		const activeChannel = channel.find(x=> x.active);

		if (activeRoom && activeChannel) {
			socket.emit('get_channel_message', {
				room: activeRoom._id,
				channel: activeChannel._id
			});
		}
	}
	render(){
		const { messages } = this.props;

		return (
			<div className="row">
				<div className="col">
					{messages.map((x, index) => {
						return (<ChatMessage key={index} _message={x} />);
					})}
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

export default withRouter(connect(getState)(ChatForm));