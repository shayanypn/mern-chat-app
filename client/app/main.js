import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { subscribe } from 'redux-subscriber';

import { USER } from './actions';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Back from './pages/Back';

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		};
	}
	componentDidMount(){
		this.props.dispatch({type: USER.CHECKTOKEN});
	}
	loading(mode){
		this.setState({
			isLoading: mode
		});
	}
	render() {
		const { user, loading, observer } = this.props;
		const unsubscribe = observer(
			state => ({ loading: state.loading.isloading }),
			(state, oldState) => {
				this.loading(state);
			},
		)

		return (
			<div>
				{ this.state.isLoading ? <div className="bx-loading">
					<div className="spinner">
						<div className="bounce1"></div>
						<div className="bounce2"></div>
						<div className="bounce3"></div>
					</div>
				</div>:''}
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/signin' render={ () => ( user.isAuthenticate ? <Redirect to='/app' /> : <Login />) }/>
					<Route path='/signup' render={ () => ( user.isAuthenticate ? <Redirect to='/app' /> : <Register />) }/>
					<Route path='/about-us' component={AboutUs}/>
					<Route path='/blog' component={Blog}/>
					<Route path='/app' render={ () => ( user.isAuthenticate ? <Back /> : <Redirect to='/signin' />) }/>
				</Switch>
			</div>
		)
	}
}

function getState(state){
	return state;
}

export default withRouter(connect(getState)(Main));
