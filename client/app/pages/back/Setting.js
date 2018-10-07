import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class Setting extends React.Component {

	render(){
		return (
			<div>
				Setting
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Setting));