import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { socket } from './../socket';
import { CHATROOM } from './../actions';



import Setting from './back/Setting';
import Dashboard from './back/Dashboard';
import AddChatUser from './back/AddChatUser';
import BackSidebar from './../components/BackSidebar';

class Back extends React.Component {
	constructor(props){
		super(props);

		socket.on('get_chatroom', (error,result) => {
			this.props.dispatch(CHATROOM.update(result));
		});
		socket.on('authenticate', (error,result) => {
			if (error) {
				console.log('authenticate problem' , error);
			};
			if (result) {
				this.onGetUserContacts();
			};
		});
	}
	componentDidMount(){
		const { user } = this.props;
		socket.emit('authenticate', JSON.stringify({
			username: user.username,
			token: user.token,
		}));
	}

	onGetUserContacts(){
		socket.emit('get_chatroom');
	}

	render(){
		const { match } = this.props;
		return (
			<div className="container-fluid">
				<div className="row">
					<BackSidebar />
					<main role="main" className="col-md-10 col-lg-10">
						<Route exact path={`${match.path}/`} component={Dashboard} />
						<Route exact path={`${match.path}/add-user`} component={AddChatUser} />
						<Route path={`${match.path}/setting`} component={Setting} />
					</main>
				</div>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Back));