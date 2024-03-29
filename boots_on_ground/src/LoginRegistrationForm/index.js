import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';

class LoginRegisterForm extends React.Component {
	constructor(){
		super()

		this.state={
			'email': '',
			'username': '',
			'orgname': '',
			'password': '',

			action: 'login'
		}
	}

	LoginRegister = () => {
		if (this.state.action === 'login') {
			this.props.login({
				username: this.state.username,
				password: this.state.password
			})
		} else {
			this.props.register({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			})
		} 
	}

	switchForm = () => {
		if (this.state.action === 'login') {
			this.setState({
				action: 'register'
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.LoginRegister()
	}

	render(){
		return(
			<div className="LoginRegisterForm">
				<Form onSubmit={this.handleSubmit}>
				{
					this.state.action === "register"
					?
					<React.Fragment>
					<Label>Email:</Label>
					<Form.Input
					type="text"
					name="email"
					value={this.state.email}
					onChange={this.handleChange}
					/>
					</React.Fragment>
					:
					null
				}	
				<Label>Username:</Label>
					<Form.Input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
					/>
					<Label>Password:</Label>
					<Form.Input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
					/>
					<Button type="Submit">{this.state.action === "register" ? "Register" : "Log In"}</Button>
					</Form>
					{
						this.state.action === "register"
						?
						<small>Already have an account? Log in <span onClick={this.switchForm}>here</span>!</small>
						:
						<small>Are you an organization? Sign up <span onClick={this.switchForm}>here</span>!</small>
					}
				</div>
			)
	}
}
export default LoginRegisterForm;