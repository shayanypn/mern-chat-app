import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Ionicon from 'react-ionicons'
import FileBase64 from 'react-file-base64';

import { socket } from './../socket';
import ChatMessage from './ChatMessage';

class ChatForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			image: null
		};
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
			image: this.state.image,
			date: (new Date()).getTime()
		};
		if (message.room && message.channel && message.text.length) {
			socket.emit('add_channel_message', message);
			this.message.value = '';
			this.setState({
				image: null
			});
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
	onImageChange(image) {
		this.setState({
			image: image ? image.base64 : null
		});
	}
	componentDidMount() {
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}
	scrollToBottom() {
		const scrollHeight = this.box_message.scrollHeight;
		const height = this.box_message.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.box_message.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}
	render(){
		const { messages } = this.props;
		return (
			<div className="message">
				<div className="row message__list" ref={el => this.box_message = el}>
					<div className="col">
						{messages.map((x, index) => {
							return (<ChatMessage key={index} _message={x} />);
						})}
					</div>
				</div>
				<div className="row message__form">
					<div className={`message__form__image ${this.state.image ? 'message__form__image--delete' : 'message__form__image--add'}`}
						onClick={e => this.onImageChange(null)}>
						{this.state.image ? '' : <FileBase64 onDone={this.onImageChange.bind(this)} /> }
						<button type="button"><Ionicon icon={this.state.image ? 'ios-trash' : 'md-add' } fontSize="25px" /></button>
					</div>
					<div className={`message__form__text ${this.state.image ? 'message__form__text--image' : ''}`}>
						{this.state.image ? <img className="rounded-circle" src={this.state.image} /> : ''}
						<textarea ref={el => this.message=el}  />
					</div>
					<div className="message__form__send" onClick={this.onSend.bind(this)}>
						<button type="button"><Ionicon icon="ios-send" fontSize="25px" /></button>
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