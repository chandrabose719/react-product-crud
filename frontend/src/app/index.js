import React, { Component } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

// Import
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProductDetail } from "./components/ProductDetail";
import { Add } from "./components/Add";
import { Update } from "./components/Update";

class App extends Component{
	render(){
		return(
			<BrowserRouter>
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<Header />
						</div>
					</div>
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<Route exact path="/" component={ Home } />	
							<Route path="/product-detail/:id" component={ ProductDetail } />	
							<Route path="/add-product" component={ Add } />	
							<Route path="/edit-product/:id" component={ Update } />	
						</div>
					</div>	
				</div>
			</BrowserRouter>	
		)
	}
};

render(
	<App/>, 
	window.document.getElementById("app")
);