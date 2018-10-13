import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';
import { CHATROOM } from './../../actions';

import Card from './../../components/Card';

class Channel extends React.Component {

	onSubmit(){
		const { room } = this.props;

		const active_room = room.find(x=> x.active);
		if (active_room) {
			socket.emit('add_room_channel', {
				room_id: active_room._id,
				name: this.channel_name.value
			});
		};
	}
	render(){
		const { channel } = this.props;

		return (
			<div className="row justify-content-md-center">
				<div className="col-12">
					<h2>Channel List </h2>
				</div>
				<div className="col-12">
					<ul className="list-group">
						{channel.map((x, index) =>{
							return (<li key={index} className="list-group-item">{x.name}</li>);
						})}
					</ul>
				</div>
				<Card parentClass="col-12 mt-3">
					<form onSubmit={e => e.preventDefault() } >
						<div className="form-group">
							<label>Channel Name</label>
							<input type="text"
								className="form-control" placeholder="channel name" 
								ref={el => this.channel_name=el}
								/>
						</div>
						<div className="form-group">
							<button type="button"
								className="btn btn-primary"
								onClick={this.onSubmit.bind(this)}
								>add</button>
						</div>
					</form>
				</Card>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Channel));