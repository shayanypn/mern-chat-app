import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CHATROOM } from './../../actions';


class Setting extends React.Component {
	componentDidMount(){
		this.props.dispatch({type: CHATROOM.DECTIVE});
	}
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