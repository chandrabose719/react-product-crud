import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";

const axios = require('axios');

export class Add extends Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			add_title: "New Product",
			errorMessage:"",
			title:"",
			description:"",
			price:"",
			newImage:"",
			titleErr:"",
			descriptionErr:"",
			priceErr:"",
			imageErr:"",
		}
	}

	handleSubmit = (event) => {
		var baseUrl = 'http://localhost:3401/product/';
		
		event.preventDefault();
		if(this.state.title == ''){
			this.setState({titleErr:"Title should not empty!"});	
		}else if(this.state.description == ''){
			this.setState({descriptionErr:"Description should not empty!"});	
		}else if(this.state.price == ''){
			this.setState({priceErr:"Price should not empty!"});	
		}else if(this.state.newImage == ''){
			this.setState({imageErr:"Please upload image with correct format!"});	
		}else{
			const fd = new FormData();
			fd.append('image', this.state.newImage);
			fd.append('title', this.state.title);
			fd.append('description', this.state.description);
			fd.append('price', this.state.price);
			axios.request({
				method: "post",
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

		var { add_title, errorMessage, titleErr, descriptionErr, priceErr, imageErr } = this.state;
		let errorMessageContent;
		let titleErrContent;
		let descriptionErrContent;
		let priceErrContent;
		let imageErrContent;

		if(errorMessage){
			errorMessageContent =
				<div className="alert alert-warning alert-dismissible">
					<button type="button" className="close" data-dismiss="alert">&times;</button>
					<strong>Warning!</strong> { errorMessage }.
				</div>
			;	
		}

		if(titleErr){
			titleErrContent = <span className="text-danger"> { titleErr } </span>;	
		}

		if(descriptionErr){
			descriptionErrContent = <span className="text-danger"> { descriptionErr } </span>;	
		}
		
		if(priceErr){
			priceErrContent = <span className="text-danger"> { priceErr } </span>;	
		}

		if(imageErr){
			imageErrContent = <span className="text-danger"> { imageErr } </span>;	
		}

		return(
			<div className="add-part">
				<h4 className="text-center text-info">{ add_title }</h4>
				<form onSubmit={ this.handleSubmit }>
					<div className="row">
						<div className="col-6 offset-3">
							{ errorMessageContent }
						</div>
						<div className="col-6 offset-3">
							<div className="form-group">
								<label>Title: <span className="text-danger">*</span> </label>
								<input type="text" className="form-control" ref="title" name="title" onChange={this.handleInputChange} />
								{ titleErrContent }
							</div>
						</div>
						<div className="col-6 offset-3">
							<div className="form-group">
								<label>Description: <span className="text-danger">*</span> </label>
								<input type="text" className="form-control" ref="description" name="description" onChange={this.handleInputChange} />
								{ descriptionErrContent }
							</div>
						</div>
						<div className="col-6 offset-3">
							<div className="form-group">
								<label>Price: <span className="text-danger">*</span> </label>
								<input type="number" className="form-control" ref="price" name="price" onChange={this.handleInputChange} />
								{ priceErrContent }
							</div>
						</div>
						<div className="col-6 offset-3">
							<div className="form-group">
								<label>New Image: <span className="text-danger">*</span> </label><br/>
								<input type="file" className="" name="newImage" ref="newImage" onChange={this.fileSelectedHandler} />
								<br/>{ imageErrContent }
							</div>
						</div>
						<div className="col-6 offset-3">
							<div className="form-group">
								<input type="submit" className="form-control btn btn-primary" name="product-submit" />
							</div>
							<div className="form-group">
								<Link className="form-control btn btn-info" to="/">BACK TO HOME</Link>
							</div>
						</div>
					</div>		
				</form>
			</div>
		)
	}
};