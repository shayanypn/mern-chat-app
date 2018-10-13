import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../socket';

class ChatMessage extends React.Component {

	render(){
		const { _message, index } = this.props;

		return (
			<div className="row">
				<div className="col">
					<div className="message__list__item">
						<div className="message__list__item__avatar"></div>
						<div className="message__list__item__text">
							<div className="message__list__item__text__auther">
								{_message.author ? _message.author.name : ''} <span>12:41 PM</span>
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