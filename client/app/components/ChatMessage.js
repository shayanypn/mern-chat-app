import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Moment from 'react-moment';
import Ionicon from 'react-ionicons';
import swal from 'sweetalert2';
import { socket } from './../socket';

class ChatMessage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: props._message.text,
			editing: false,
			deleted: false
		}
		socket.on('update_message', (result, error) => {
			if (result) {
				if (props._message._id === result.id) {
					this.setState({
						editing: false,
						text: this.message_text.value
					});
				}
			}
			if (error) {console.log('update_message' , error);}
		});
		socket.on('delete_message', (result, error) => {
			if (result) {
				if (props._message._id === result.id) {
					this.setState({
						deleted: true
					});
				}
			}
			if (error) {console.log('update_message' , error);}
		});
	}
	onEdit(){
		this.setState({
			editing: true
		})
	}
	onCancel(){
		this.setState({
			editing: false
		})
	}
	onUpdate(){
		const { _message } = this.props;
		socket.emit('update_message', {
			id: _message._id,
			message: this.message_text.value
		});
	}
	onDelete(){
		swal({
			title: 'Are you sure?',
			text: 'You won\'t be able to revert this!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#dedede',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				const { _message } = this.props;
				socket.emit('delete_message', {
					id: _message._id
				});
			}
		});
	}
	render(){
		const { _message, index } = this.props;
		const current_poch = ((new Date()).getTime());
		const can_modify = ((current_poch - _message.date)/60000) < 3;


		if (this.state.deleted) {
			return null;
		}

		return (
			<div className="row">
				<div className="col">
					<div className={`message__list__item ${this.state.editing ? 'message__list__item--editing' : ''}`}>
						<div className="message__list__item__avatar">
							<img className="rounded-circle" src={_message.author ? _message.author.avatar : ''} />
						</div>
						<div className="message__list__item__text">
							<div className="message__list__item__text__auther">
								{_message.author ? _message.author.name : ''}
								{_message.date ? <span className="pl-2"><Moment fromNow>{_message.date}</Moment></span> : ''}
							</div>
							<div className="message__list__item__text__action">
								<div className="btn-group">
									{can_modify ? (<button onClick={this.onDelete.bind(this)} className="btn btn-default"><Ionicon icon="ios-trash" fontSize="15px" /></button>) : ''}
									{can_modify ? (<button onClick={this.onEdit.bind(this)} className="btn btn-default"><Ionicon icon="ios-brush" fontSize="15px" /></button>) : ''}
								</div>
							</div>
							{_message.image ? <div className="message__list__item__text__image"><img src={_message.image} /></div> : ''}
							{this.state.editing ? (<div className="message__list__item__text__form">
								<div className="form-group">
									<textarea className="form-control"
										ref={el => this.message_text=el}
										defaultValue={this.state.text} />
								</div>
								<div className="form-group">
									<button onClick={this.onUpdate.bind(this)} className="btn btn-sm btn-success">Update</button>
									<button onClick={this.onCancel.bind(this)} className="btn btn-sm btn-secondary ml-1">Cancel</button>
								</div>
							</div>) : <div>{this.state.text}</div>}
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

export default withRouter(connect(getState)(ChatMessage));