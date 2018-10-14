import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'
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
			date: (new Date()).getTime()
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
			<div className="message">
				<div className="row message__list">
					<div className="col" >
						{messages.map((x, index) => {
							return (<ChatMessage key={index} _message={x} />);
						})}
					</div>
				</div>
				<div className="row message__form">
					<div className="col-1 pl-0 pr-0">
						<button type="button">
							<Ionicon icon="md-add" fontSize="25px" />
						</button>
					</div>
					<div className="col-10 pl-0 pr-0">
						<textarea ref={el => this.message=el}  />
					</div>
					<div className="col-1 pl-0 pr-0">
						<button type="button" onClick={this.onSend.bind(this)}>
							<Ionicon icon="ios-send" fontSize="25px" />
						</button>
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