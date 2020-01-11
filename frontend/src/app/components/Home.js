import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			title: "Product Details",
			products: [],
		}
	
	}

	componentDidMount(){
	
		const baseUrl =  "http://localhost:3401/product";

		fetch(baseUrl)
		.then(res => res.json())
		.then(json => {
			this.setState({
				products: json.data,
			})
		})
	}

	render(){
		var { title, products } = this.state;
		
		if(!products.length){
			return <div className="loading-block">
				<div className="row">
					<div className="col-4 offset-4 text-center text-danger">Loading....</div>
				</div>
			</div>;
		}

		let proTable = products.map(product => {
			return(
				<tr key={product._id}>
					<td> { product.title} </td> 
					<td> { product.description } </td> 
					<td> &#8377; { product.price } </td> 
					<td> 
						<Link className="btn btn-success" to={"/product-detail/"+product._id }>
							<i className="fa fa-eye"></i>
						</Link>&nbsp;
						<Link className="btn btn-warning" to={"/edit-product/"+ product._id }>
							<i className="fa fa-edit"></i>
						</Link> 
					</td>
				</tr>	
			)	
		});
		
		return(
			<div className="home-part">
				<h4 className="text-center text-info">{ title }</h4>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>	
					<tbody>
						{ proTable }
					</tbody>
				</table>
			</div>
		)
	}
};