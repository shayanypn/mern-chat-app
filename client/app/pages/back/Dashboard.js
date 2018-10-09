import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../../socket';

class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				Dashboard
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Dashboard));