import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ProductDetail extends Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			title: "Product Detail",
			"id": props.match.params.id,
			product:"",
		}
	
	}

	componentDidMount(){
	
		const baseUrl =  "http://localhost:3401/product/"+this.state.id;

		fetch(baseUrl)
		.then(res => res.json())
		.then(json => {
			this.setState({
				product: json.data,
			})
		})
	}

	render(){
		var { title, product } = this.state;
		
		if(!product){
			return <div className="loading-block">
				<div className="row">
					<div className="col-4 offset-4 text-center text-danger">Loading....</div>
				</div>
			</div>;
		}
		
		return(
			<div className="product-detail-part">
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
						<div className="product-detail-image-content">
							<img src={ product.image } className="img-fluid" />
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
						<div className="pt-4">
							<h4 className="text-left text-info py-2">{ product.title }</h4>
							<p>{ product.description }</p>
							<div className="row">
								<div className="col-8 my-3">
									<Link className="form-control btn btn-warning" to={"/edit-product/"+ product._id }>
										EDIT PRODUCT
									</Link>
								</div>
								<div className="col-8 my-3">
									<Link className="form-control btn btn-info" to="/">
										BACK TO HOME
									</Link>
								</div>
							</div>		
						</div>			
					</div>
				</div>
			</div>
		)
	}
};