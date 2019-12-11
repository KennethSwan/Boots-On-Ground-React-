import React, { Component } from 'react'; 
import { Grid, Button } from 'semantic-ui-react';
import '../App.css'; 
import CreateResource from '../CreateResourceForm';
import EditResourceModal from '../EditResourceModal';
import ResourceList from '../ResourceList'

export default class ResourceContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			resources: [],
			editModalOpen: false,
			resourceFocus: false,
			resourceToEdit:{
				org_name: '',
				url: '',
				phoneNumber: '',
				email: '',
				category: '',
				description: '',
			},
			chosenResource: this.props.chosenCategory,
			numberOfResourcesOpen: 0
		}
	}
	componentDidMount(){
		this.getResource();
	}

	toggleResourceFocus = () => {
		this.setState({
			resourceFocus: !this.state.resourceFocus
		})
	}

	addResource = async (e, resourceFromTheForm) => {
		e.preventDefault();
		try {
			const createdResourceResponse = await fetch(process.env.REACT_APP_API_URL + '/resource/', {
				method: 'POST',
				credentials: 'include', 
				body: JSON.stringify(resourceFromTheForm),
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

	// getResource = async () => {
	//  	try {
	// 		const resources = await fetch(process.env.REACT_APP_API_URL + '/resource/')
	//  		const parsedResource = await resources.json();
	//  		this.setState({
	//  			resources: parsedResource.data
	//  		})
	// 	} catch(err) {
	//  		console.log(err);
	//  	}
	//  }
	getResource = async () => {
		try {
			const resources = await fetch(process.env.REACT_APP_API_URL + "/resource", {
				credentials: "include"
			});
			const parsedResource = await resources.json();
			console.log("parsedResource");
			console.log(parsedResource);
			this.setState({
				resources: parsedResource.resource
			})
			console.log("this.state - ResourceContainer");
			console.log(this.state.resources);
		}
		catch(err) {

		}
	}

	editResource = (idOfResourceToEdit) => {
		const resourceToEdit = this.state.resources.find(resource => resource.id === idOfResourceToEdit)
		this.setState({
			editModalOpen: true,
			resourceToEdit:{
				...resourceToEdit
			}
		})
	}

	handledEditChange = (event) => {
		this.setState({
			resourceToEdit:{
				...this.state.resourceToEdit,
				[event.target.name]: event.target.value
			}
		})
	}

	increaseNumberOfResourcesOpen = (operation) => {
		if (operation === 'add') {
			this.setState({
				numberOfResourcesOpen: this.state.numberOfResourcesOpen + 1
			})
		} else {
			this.setState({
				numberOfResourcesOpen: this.state.numberOfResourcesOpen - 1
			})
		}
	}

	updateResource = async (e) => {
		e.preventDefault()
		try {
			const url = process.env.REACT_APP_API_URL + '/resource/' + this.state.resourceToEdit.idOfResourceToEdit
			const updateResponse = await fetch(url, {
				method: 'PUT', 
				credentials: 'include',
				body: JSON.stringify(this.state.resourceToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const updateResponseParsed = await updateResponse.json()
			const newResourcesArrayWithUpdate = this.state.resources.map((resource) => {
				if(resource.id === updateResponseParsed.data.id) {
					resource = updateResponseParsed.data
				}
				return resource
			})
			this.setState({
				resources: newResourcesArrayWithUpdate
			})
			this.closeEditModal()
		}	catch(err){
			console.log(err);
		}
	}

	closeEditModal = () => {
		this.setState({
			editModalOpen: false
		})
	}

		render(props){
			console.log("this.state.resources.length > 0 >> ", this.state.resources.length > 0);
		return(
			<Grid
				columns={4} 
				divided
				textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
			>
				<Grid.Row>
		          	<Grid.Column>
		          	</Grid.Column>
		          	<Grid.Column>
		          	{ 
		          		this.state.numberOfResourcesOpen === 0
		          		?
	           			<CreateResource addResource={this.addResource}/>
	           			:
	           			null
		          	}
	         		</Grid.Column>
	         		<EditResourceModal
	         			open={this.state.editModalOpen}
	         			updateResource={this.updateResource}
	         			resourceToEdit={this.editResource}
	         			closeEditModal={this.closeEditModal}
	         			handledEditChange={this.handledEditChange}
	         			/>
					<Grid.Column>
						{ this.state.resources.length > 0 ?
							<ResourceList resources={this.state.resources}/>
							:
							null
							//editResource={this.editResource}
							//chosenCategory={this.props.chosenCategory}
							//resourceFocus={this.state.resourceFocus}
							//toggleResourceFocus={this.toggleResourceFocus}
							//increaseNumberOfResourcesOpen={this.increaseNumberOfResourcesOpen}
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}