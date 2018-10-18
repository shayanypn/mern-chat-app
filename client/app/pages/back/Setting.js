import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FileBase64 from 'react-file-base64';
import toastr from 'reactjs-toastr';
import { USER } from '../../actions';
import { SERVER } from '../../config';

import Card from './../../components/Card';

class Setting extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			timer: null,
			avatar: (props.user && props.user.avatar) ? props.user.avatar : null
		};
	}
	onAvatarChange(image){
		this.setState({
			avatar: image.base64
		});
	}
	onSubmit(){
		const { user } = this.props;

		if (!this.state.avatar) {
			toastr.warning('please select an avatar!');
			return;
		}

		axios.put(`${SERVER}/user/avatar`,{
				avatar: this.state.avatar
			},{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': user.token
				}
			})
		.then( response => {
			toastr.success('avatar update successfully!');
			this.props.dispatch({
				type: USER.AVATAR,
				avatar: this.state.avatar
			});
		})
		.catch( (error, e1) => {
			if (error.response.status === 422) {
				toastr.error('please select an avatar!');
			}else{
				toastr.error(error.response.message);
			}
		});
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
							<img src={this.state.avatar ? this.state.avatar : 'https://dummyimage.com/200x200/4d394b/fff'} className="w-100 rounded-circle"
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