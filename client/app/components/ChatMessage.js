import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Moment from 'react-moment';
import { socket } from './../socket';

class ChatMessage extends React.Component {

	render(){
		const { _message, index } = this.props;
		return (
			<div className="row">
				<div className="col">
					<div className="message__list__item">
						<div className="message__list__item__avatar">
							<img className="rounded-circle" src={_message.author ? _message.author.avatar : ''} />
						</div>
						<div className="message__list__item__text">
							<div className="message__list__item__text__auther">
								{_message.author ? _message.author.name : ''}
								{_message.date ? <span className="pl-2"><Moment fromNow>{_message.date}</Moment></span> : ''}
							</div>
							<div className="message__list__item__text__image">
								<img src={_message.image} />
							</div>
							{_message.text}
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