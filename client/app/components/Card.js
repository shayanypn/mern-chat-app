import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Card extends React.Component {
	render(){
		const { title, parentClass, children} = this.props;
		return (
			<div className={parentClass ? parentClass : ''}>
				<div className="card">
					<div className="card-header text-center">
						<h2>{title}</h2>
					</div>
					<div className="card-body">
						{children}
					</div>
				</div>
			</div>
		)
	}
}


function getState(state){
	return {
		state
	};
}

export default withRouter(connect(getState)(Card));