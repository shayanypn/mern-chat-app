import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {subscribe} from 'redux-subscriber';

import Home from './pages/Home';
import Login from './pages/Login';
import Back from './pages/Back';


class Main extends React.Component {


	render() {
		const { user, loading, observer } = this.props;
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/login' component={Login}/>
					<Route exact path='/app' component={Back}/>
				</Switch>
			</div>
		)
	}
}

function getState(state){
	return state;
}

export default withRouter(connect(getState)(Main));
