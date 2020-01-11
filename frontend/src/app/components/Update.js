import React, { Component } from "react";
import { Link } from "react-router-dom";

const axios = require('axios');

export class Update extends Component{
	
	constructor(props){
		
		super(props);

		this.state = {
			edit_title: "Edit Product",
			errorMessage:"",
			id:props.match.params.id,
			title:"",
			description:"",
			price:"",
			image:"",
			newImage:"",
		}

		this.handleInputChange = this.handleInputChange.bind(this);

	}

	componentDidMount(){
	
		const baseUrl =  "http://localhost:3401/product/"+this.state.id;

		fetch(baseUrl)
		.then(res => res.json())
		.then(json => {
			this.setState({
				id: json.data._id,
				title: json.data.title,
				description: json.data.description,
				price: json.data.price,
				image: json.data.image,
			});
		})
	}

	handleSubmit = (event) => {
		
		var baseUrl = 'http://localhost:3401/product/'+this.state.id;
		
		event.preventDefault();
		if(this.state.title == ''){
			this.setState({errorMessage:"Title should not empty!"});	
		}else if(this.state.description == ''){
			this.setState({errorMessage:"Description should not empty!"});	
		}else if(this.state.price == ''){
			this.setState({errorMessage:"Price should not empty!"});	
		}else{
			const fd = new FormData();
			fd.append('image', this.state.newImage);
			fd.append('title', this.state.title);
			fd.append('description', this.state.description);
			fd.append('price', this.state.price);
			axios.request({
				method: "put",
				url: baseUrl,
				data: fd
			}).then(response =>{
				this.props.history.push('/');
			}).catch(error => {
				this.setState({errorMessage:error.response.data.message});
				console.log(error.response);
				console.log(error.response.data.message);
			});
		}	
	}

	handleInputChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	fileSelectedHandler = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.files[0]
		});
	}

	render(){

		var { edit_title, errorMessage, id, title, description, price, image } = this.state;
		let errorMessageContent;

		if(errorMessage != ''){
			errorMessageContent =
				<div className="alert alert-warning alert-dismissible">
					<button type="button" className="close" data-dismiss="alert">&times;</button>
					<strong>Warning!</strong> { errorMessage }.
				</div>
			;	
		}

		return(
			<div className="update-part">
				<h4 className="text-center py-3">{ edit_title }</h4>
				<form onSubmit={ this.handleSubmit }>
					<div className="row">
						<div className="col-9 offset-1">
							{ errorMessageContent }
						</div>
						<div className="col-4 offset-1">
							<div className="row">
								<div className="col-12">
									<div className="form-group">
										<img className="img-fluid" src={ image } />
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>New Image: <span className="text-danger">*</span> </label>
										<input type="file" className="" name="newImage" ref="newImage" onChange={this.fileSelectedHandler} />
									</div>
								</div>
							</div>		
						</div>
						<div className="col-5">
							<div className="row">
								<div className="col-12">
									<div className="form-group">
										<label>Title: <span className="text-danger">*</span> </label>
										<input type="text" className="form-control" name="title" ref="title" value={ title } onChange={this.handleInputChange} />
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>Description: <span className="text-danger">*</span> </label>
										<input type="text" className="form-control" name="description" ref="description" value={ description } onChange={this.handleInputChange} />
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>Price: <span className="text-danger">*</span> </label>
										<input type="number" className="form-control" name="price" ref="price" value={ price } onChange={this.handleInputChange} />
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<input type="submit" className="form-control btn btn-primary" name="product-submit" value="SUBMIT" />
									</div>
									<div className="form-group">
										<Link className="form-control btn btn-info" to="/">BACK TO HOME</Link>
									</div>
								</div>
							</div>	
						</div>	
					</div>		
				</form>
			</div>
		)
	}
};