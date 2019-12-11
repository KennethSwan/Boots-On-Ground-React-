import React, { Component } from 'react'; 
import { Modal, Form, Button, Label, Header, Card, Image } from 'semantic-ui-react';
import ResourceContainer from '../ResourceContainer';
import CreateResource from '../CreateResourceForm';
import CategoryContainer from '../CategoryContainer';

class ResourceList extends Component {
	constructor(props){
		console.log("props");
		console.log(props);
		super(props);
		this.state = {
			resources: this.props.resources
		}
	}

	componentDidMount(){
		console.log("this.state -- ResourceList");
		console.log(this.state);
	}

	resourceList = () =>{

		const list  = this.state.resources.map((resource)=>{

			return (
					<div>
					<h1>{resource.category}</h1>
					<h2>{resource.org_name}</h2>
					<h3>{resource.organization}</h3>
					<h5>{resource._id}</h5>
					<h4>{resource.description}</h4>
					<h6>{resource.url}</h6>
					<Button onClick={() => this.props.editResource(resource._id)}>Edit Resource</Button>
					<Button onClick={() => this.props.deleteResource(resource._id)}>Delete Resource</Button>
					<hr/>
					</div>
					)


		})

		return list

	}

	// showResources = (resourceId) => {
	// 	if (resourceId === this.state.resourcesShowing){
	// 		this.props.increaseNumberOfResourcesOpen('add')
	// 		this.props.toggleResourceFocus()
	// 		this.setState({
	// 			resourcesShowing: -1
	// 		})
	// 	} else {
	// 		this.props.increaseNumberOfResourcesOpen(0)
	// 		this.props.toggleResourceFocus()
	// 		this.setState({
	// 			resourcesShowing: resourceId
	// 		})
	// 	}
	// }

	render(){
	// 	const resources = 
	// 		this.state.resources.filter(resource => resources.category === this.props.chosenCategory).map((resource) => {
	// 			return (
	// 				<React.Fragment key={resource.id}>
	// 					<Card>
	// 						<Card.Content>
	// 							<Card.Header>{resource.org_name}</Card.Header>
	// 							<Card.Description>{resource.url}</Card.Description>
	// 							<Card.Description>{resource.phoneNumber}</Card.Description>
	// 							<Card.Description>{resource.email}</Card.Description>
	// 							<Card.Description>{resource.category}</Card.Description>
	// 							<Card.Description>{resource.description}</Card.Description>
	// 						</Card.Content>
	// 							<Card.Content extra>
	// 								<Button onClick={() => this.props.editResource(resource.id)}> Edit Resource</Button>
	// 							</Card.Content>
	// 						</Card>	
	// 				</React.Fragment>
	// 		)
	// 	})

	// return (
	// 	<Card.Group>
	// 		{ resources }
	// 	</Card.Group>
	// 	)
	//console.log("this.state --- resource list")
	//console.log(this.state)
	return (

		<div>{this.resourceList()}</div>
	)
	}
} 

export default ResourceList