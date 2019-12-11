import React, { Component } from 'react'
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';

class EditResourceModal extends Component {
		constructor(props){
		super(props);
		this.state = {
			org_name: '',
			url: '',
			phoneNumber: '',
			email: '',
			category: '',
			description: '',
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	componentDidMount()  {
		this.setState(
			this.props.resourceToEdit
		)
	}


	render(){ 
	return(
		<Modal open={this.props.open} onClose={this.props.closeModal}>
		<Header>Edit Resource</Header>
		<Modal.Content>
		<Form onSubmit={(e) => this.props.updateResource(e, this.state)}>
		<Label>Organization:</Label>
		<Form.Input type='text' name ='org_name' value={this.state.org_name} onChange={this.handleChange}/>
		<Label>Url:</Label>
		<Form.Input type='text' name ='url' value={this.state.url} onChange={this.handleChange}/>
		<Label>Phone Number:</Label>
		<Form.Input type='text' name ='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange}/>
		<Label>Email:</Label>
		<Form.Input type='text' name ='email' value={this.state.email} onChange={this.handleChange}/>
		<Label>Category:</Label>
		<Form.Input type='text' name ='category' value={this.state.category} onChange={this.handleChange}/>
		<Label>Description:</Label>
		<Form.Input type='text' name ='description' value={this.state.description} onChange={this.handleChange}/>
		<Modal.Actions>
		<Button color='red' type="submit"> Update Resource </Button>
		<Button color='yellow' onClick={this.props.closeModal}> Close </Button>
		</Modal.Actions>
		</Form>
		</Modal.Content>
		</Modal>
	)
}
}

export default EditResourceModal