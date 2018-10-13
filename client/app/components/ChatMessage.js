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
					<div className="alert alert-info p-1">{_message.text}</div>
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(ChatMessage));