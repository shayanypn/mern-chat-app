import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FileBase64 from 'react-file-base64';
import Card from './../../components/Card';
import { USER } from '../../actions';

class Setting extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			timer: null,
			avatar: (props.user && props.user.avatar) 
					? props.user.avatar 
					: 'https://dummyimage.com/200x200/4d394b/fff'
		};
	}
	onAvatarChange(image){
		this.setState({
			avatar: image.base64
		});
	}
	onSubmit(){
		const { user } = this.props;

		this.props.dispatch(USER.updateAvatar({
			avatar: this.state.avatar,
			token: user.token
		}));
	}
	render(){
		const { room } = this.props;

		return (
			<div className="row justify-content-md-center">
				<Card parentClass="col-12 mt-3" cardClass="p1 bg-light">
					<div className="row">
						<div className="col-7">
							<form onSubmit={e => e.preventDefault() } >
								<div className="form-group">
									<label>Avatar</label>
									<div className="input-group-file">
										<FileBase64 onDone={this.onAvatarChange.bind(this)} />
									</div>
								</div>
								<div className="form-group">
									<button type="button" className="btn btn-primary"
										onClick={this.onSubmit.bind(this)}
										>Update</button>
								</div>
							</form>
						</div>
						<div className="col-5 text-center">
							<img src={this.state.avatar} className="w-100 rounded-circle"
									style={{maxWidth:170,maxHeight:170}} />
						</div>
					</div>
				</Card>
			</div>
		)
	}
}


function getState(state){
	return state;
}

export default withRouter(connect(getState)(Setting));