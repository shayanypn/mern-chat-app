import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Card extends React.Component {
	render(){
		const { title, parentClass, cardClass, children} = this.props;
		return (
			<div className={parentClass ? parentClass : ''}>
				<div className={`card ${cardClass || ''}`}>
					{title ? (<div className="card-header text-center">
						<h2>{title}</h2>
					</div>) : ''}
					<div className="card-body p-2">
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