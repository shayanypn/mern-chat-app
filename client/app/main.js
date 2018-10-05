import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {subscribe} from 'redux-subscriber';

import Home from './pages/Home';

class Main extends React.Component {


	render() {
		const { user, loading, observer } = this.props;
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
				</Switch>
			</div>
		)
	}
}

function getState(state){
	return state;
}

export default withRouter(connect(getState)(Main));
