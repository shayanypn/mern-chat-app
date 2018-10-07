import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';

class AboutUs extends React.Component {


	render(){

		return (
			<div>
				<TopNavbar />
				<div className="container">
					<div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h1 className="display-4">About Us</h1>
						<p className="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
					</div>
					<div className="col">
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aliquam corrupti nisi, sapiente commodi sunt officia, recusandae blanditiis inventore pariatur. Harum aliquam consectetur amet, hic? Odio explicabo adipisci, nobis illum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aliquam corrupti nisi, sapiente commodi sunt officia, recusandae blanditiis inventore pariatur. Harum aliquam consectetur amet, hic? Odio explicabo adipisci, nobis illum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aliquam corrupti nisi, sapiente commodi sunt officia, recusandae blanditiis inventore pariatur. Harum aliquam consectetur amet, hic? Odio explicabo adipisci, nobis illum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aliquam corrupti nisi, sapiente commodi sunt officia, recusandae blanditiis inventore pariatur. Harum aliquam consectetur amet, hic? Odio explicabo adipisci, nobis illum.</p>
					</div>
					<Footer />
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

export default withRouter(connect(getState)(AboutUs));