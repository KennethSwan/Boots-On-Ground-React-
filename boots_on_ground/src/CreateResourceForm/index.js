import React, { Component } from 'react'; 
import { Form, Button, Label, Segment} from 'semantic-ui-react';

class CreateResource extends Component {
	constructor(props){
		super(props);
		this.state = {
			organization: '',
			url: '',
			phoneNumber: '',
			email: '',
			category: '',
			description: ''
		}
	}
handleChange = (e) => {
	this.setState({[e.currentTarget.name]: e.currentTarget.value})
}
render(){
	return(
		<Segment>
		<h4>Create Resource</h4>
		<Form onSubmit={(e) => this.props.addResource(e, this.state)}>
		<Label>Organization:</Label>
		<Form.Input type='text' name ='organization' value={this.state.organization} onChange={this.handleChange}/>
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
		<Button type='Submit'>Create Resource</Button>
		</Form>
		</Segment>
	)
}
}

export default CreateResource;