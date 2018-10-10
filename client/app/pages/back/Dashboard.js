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

		return (
			<div className="row">
				<div className="col-4">

				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Dashboard));