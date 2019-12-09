import React, { Component } from 'react'; 
import { Grid, Button } from 'semantic-ui-react';
import '../App.css'; 
import CreateResource from '../CreateResourceForm' 

export default class ResourceContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			resources: []
		}
	}
	componentDidMount(){
		this.getCategories();
	}


	addResource = async (e, resourceFromForm) => {
		e.preventDefault();
		try {
			const createdResourceResponse = await fetch(process.env.REACT_APP_API_URL + '/resource' + resourceFromForm, {
				method: 'POST',
				credentials: 'include', 
				body: JSON.strinify(resourceFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await createdResourceResponse.json();
			console.log(parsedResponse);
			this.setState({resources: [...this.state.resources, parsedResponse.data]})
		} catch(err){
			console.log(err);
		}
	}

	getResource = async () => {
		try {
			const resources = await fetch(process.env.REACT_APP_API_URL + '/')
			const parsedResource = await resources.json();
			this.setState({
				resources: parsedResource.data
			})
		} catch(err) {
			console.log(err);
		}
	}
}