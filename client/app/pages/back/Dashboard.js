import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userLogout } from '../../actions';


class Dashboard extends React.Component {

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