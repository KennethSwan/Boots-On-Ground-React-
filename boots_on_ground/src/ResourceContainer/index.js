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
			//resourceFocus: false,
			resourceToEdit:{
				organization: '',
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
			const createdResourceResponse = await fetch(process.env.REACT_APP_API_URL + '/resource/new', {
				method: 'POST',
				credentials: 'include', 
				body: JSON.stringify(resourceFromTheForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await createdResourceResponse.json();
			console.log(parsedResponse);
			this.setState({resources: [...this.state.resources, parsedResponse.resource]})
		} catch(err){
			console.log(err);
		}
	}

	getResource = async () => {
		try {
			const resources = await fetch(process.env.REACT_APP_API_URL + "/resource", {
				credentials: "include"
			});
			const parsedResource = await resources.json();
			console.log(parsedResource);
			this.setState({
				resources: parsedResource.resource
			})
		}
		catch(err) {

		}
	}

	editResource = (idOfResourceToEdit) => {
		console.log("idOfResourceToEdit in ResourceContainer")
		console.log(idOfResourceToEdit)
		const resourceToEdit = this.state.resources.find(resource => resource._id === idOfResourceToEdit)
		console.log("resourceToEdit in ResourceContainer")
		console.log(resourceToEdit)
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

//	increaseNumberOfResourcesOpen = (operation) => {
//		if (operation === 'add') {
//			this.setState({
//				numberOfResourcesOpen: this.state.numberOfResourcesOpen + 1
//			})
//		} else {
//			this.setState({
//				numberOfResourcesOpen: this.state.numberOfResourcesOpen - 1
//			})
//		}
//	}

	updateResource = async (e, resourceToUpdate) => {
		e.preventDefault()
		console.log("this is resourceToUpdate")
		console.log(resourceToUpdate)

		try {
			const updateResponse = await fetch(process.env.REACT_APP_API_URL + '/resource/' + this.state.resourceToEdit._id, {
				method: 'PUT', 
				credentials: 'include',
				body: JSON.stringify(resourceToUpdate),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const updateResponseParsed = await updateResponse.json()
			console.log("here's what we got back from update");
			console.log(updateResponseParsed);

			// creating an array of resources -- replacing the updated one with new info
			const newResourcesArrayWithUpdate = this.state.resources.map((resource) => {
				if(resource._id === updateResponseParsed.data._id) {
					console.log("replacement");
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


	deleteResource = async (resource) => {
		console.log(resource);
		const deleteResourceResponse = await fetch(process.env.REACT_APP_API_URL + '/resource/' + resource, {
			method: 'DELETE',
			credentials: 'include'
		})
			const deleteResourceParsed = await deleteResourceResponse.json()
			console.log(deleteResourceResponse);
			this.setState({resources: this.state.resources.filter((resources) => resources)})
			this.getResource()
	}

	closeEditModal = () => {
		this.setState({
			editModalOpen: false
		})
	}
		render(props){
			console.log(this.state.resourceToEdit)
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
		          	{ 
		          		this.state.numberOfResourcesOpen === 0
		          		?
	           			<CreateResource addResource={this.addResource}/>
	           			:
	           			null
		          	}
	         		</Grid.Column>
	         		{this.state.editModalOpen ? 
	         			<EditResourceModal
	         			open={this.state.editModalOpen}
	         			updateResource={this.updateResource}
	         			resourceToEdit={this.state.resourceToEdit}
	         			closeEditModal={this.closeEditModal}
	         			handledEditChange={this.handledEditChange}
	         			/>:
	         			null}
					<Grid.Column>
						{ this.state.resources.length > 0 ?
							<ResourceList resources={this.state.resources} editResource={this.editResource} deleteResource={this.deleteResource}/>
							:
							null
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}