import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component{
	render(){
		return(
			<div className="header-part">
				<nav className="navbar navbar-expand-sm navbar-light bg-light">
			  		<Link className="navbar-brand" to="/">LOGO</Link>
					<ul className="navbar-nav">
		    			<li className="nav-item">
		      				<Link className="nav-link" to="/">Home</Link>
		    			</li>
		    			<li className="nav-item">
		      				<Link className="nav-link" to="/add-product">Add</Link>
		      			</li>
		  			</ul>
				</nav>	
			</div>
		)
	}
};