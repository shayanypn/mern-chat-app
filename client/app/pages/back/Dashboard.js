import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Card from './../../components/Card';
import ChatForm from './../../components/ChatForm';


class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const { room, channel, message } = this.props;
		const activeRoom = room.find(x=> x.active);
		const activeChannel = channel.find(x=> x.active);

		return (
			<div className="row">
				<div className="col">
					{ (activeRoom && activeChannel) ? <ChatForm messages={message} /> : ''}
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Dashboard));