import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';

import Card from './../../components/Card';

class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const { match, room, channel } = this.props;

		const activeRoom = room.find(x=> x.active);

		return (
			<div className="row">
				<div className="col-4">
					<ul className="list-group">
						{channel.map((x,index) =>{
							return (<li key={index} className="list-group-item">{x.name}</li>)
						})}
					</ul>
					{activeRoom ? (<Link to={`${match.path}/channel`}> <button className="btn btn-primary btn-sm"> add channel</button></Link>) : ''}
				</div>
				<div className="col-8">
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Dashboard));