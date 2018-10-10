import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';

import Card from './../../components/Card';

class RoomDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const { room } = this.props;

		// socket.emit('get_room_channel', );
	}

	render(){

		return (
			<div className="row">

			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(RoomDetail));