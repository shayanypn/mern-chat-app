import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FileBase64 from 'react-file-base64';

import { socket } from './../../socket';
import { CHATROOM } from './../../actions';

import Card from './../../components/Card';

class Room extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			timer: null,
			avatar: 'https://dummyimage.com/200x200/4d394b/fff'
		};
	}
	onSubmit(){
		socket.emit('add_room', {
			name: this.room_name.value,
			description: this.room_description.value,
			avatar: this.state.avatar
		});
	}
	onAvatarChange(image){
		this.setState({
			avatar: image.base64
		});
	}
	render(){
		const { room } = this.props;

		return (
			<div className="row justify-content-md-center">
				<div className="col-12">
					<h2>Room List </h2>
				</div>
				<div className="col-12">
					<ul className="list-group">
						{room.map((x, index) =>{
							return (<li key={index} className="list-group-item">{x.name}</li>);
						})}
					</ul>
				</div>
				<Card parentClass="col-12 mt-3" cardClass="p1 bg-light">
					<div className="row">
						<div className="col-8">
							<form onSubmit={e => e.preventDefault() } >
								<div className="form-group">
									<label>Name</label>
									<input type="text"
										className="form-control" placeholder="room name" 
										ref={el => this.room_name=el}
										/>
								</div>
								<div className="form-group">
									<label>Info</label>
									<textarea type="text"
										className="form-control" placeholder="room description" 
										ref={el => this.room_description=el}
										/>
								</div>
								<div className="form-group">
									<label>Avatar</label>
									<div className="input-group-file">
										<FileBase64 onDone={this.onAvatarChange.bind(this)} />
									</div>
								</div>
								<div className="form-group">
									<button type="button" className="btn btn-primary"
										onClick={this.onSubmit.bind(this)}
										>Create</button>
								</div>
							</form>
						</div>
						<div className="col-4 text-center">
							<img src={this.state.avatar}  className="w-100 rounded-circle"
									style={{maxWidth:170,maxHeight:170}} />
						</div>
					</div>
				</Card>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Room));