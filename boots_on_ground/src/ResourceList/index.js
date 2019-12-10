import React, { Component } from 'react'; 
import { Modal, Form, Button, Label, Header, Card, Image } from 'semantic-ui-react';
import ResourceContainer from '../ResourceContainer';
import CreateResource from '../CreateResourceForm';
import CategoryContainer from '../CategoryContainer';

class ResourceList extends Component {
	constructor(props){
		super(props)
		this.state = ({
			resourcesShowing: -1, 
		})
	}

	componentDidMount(){
	}



	showResources = (resourceId) => {
		if (resourceId === this.state.resourcesShowing){
			this.props.increaseNumberOfResourcesOpen('add')
			this.props.toggleResourceFocus()
			this.setState({
				resourcesShowing: -1
			})
		} else {
			this.props.increaseNumberOfResourcesOpen(0)
			this.props.toggleResourceFocus()
			this.setState({
				resourcesShowing: resourceId
			})
		}
	}

	render(props){
		const resources = 
			this.props.resources.filter(album => resources.category === this.props.chosenCategory).map((resource) => {
				return (
					<React.Fragment key={resource.id}>
						<Card>
							<Card.Content>
								<Card.Header>{resource.org_name}</Card.Header>
								<Card.Description>{resource.url}</Card.Description>
								<Card.Description>{resource.phoneNumber}</Card.Description>
								<Card.Description>{resource.email}</Card.Description>
								<Card.Description>{resource.category}</Card.Description>
								<Card.Description>{resource.description}</Card.Description>
							</Card.Content>
								<Card.Content extra>
									<Button onClick={() => this.props.editResource(resource.id)}> Edit Resource</Button>
								</Card.Content>
							</Card>	
					</React.Fragment>
			)
		})
	return (
		<Card.Group>
			{ resources }
		</Card.Group>
		)

	}
} 

export default ResourceList