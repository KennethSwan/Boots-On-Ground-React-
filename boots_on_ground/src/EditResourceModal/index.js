import React from 'react'
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';

function EditResourceModal(props){
	return(
		<Modal open={props.open} onClose={props.closeModal}>
			<Header>Edit Resource</Header>
			<Modal.Content>
				<Form onSubmit={props.updateResource}>
					<Label> Organization: </Label>
					<Form.Input type ="text" name="organization" value={props.resourceToEdit.org_name} onChange={props.handleEditChange} />

					<Label> Url: </Label>
					<Form.Input type="text" name="url" value={props.resourceToEdit.url} onChange={props.handleEditChange}/>

					<Label> Phone Number: </Label>
					<Form.Input type="text" name="phoneNumber" value={props.resourceToEdit.phoneNumber} onChange={props.handleEditChange}/>

					<Label> Email: </Label>
					<Form.Input type="text" name="email" value={props.resourceToEdit.email} onChange={props.handleEditChange}/>

					<Label> Category: </Label>
					<Form.Input type="text" name="category" value={props.resourceToEdit.category} onChange={props.handleEditChange}/>

					<Modal.Actions>
						<Button color='red' type="submit"> Update Resource </Button>
						<Button color='yellow' onClick={props.closeModal}>Close Modal</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditResourceModal