import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegistrationForm';
//import CategoryContainer from './CategoryContainer';
import ResourceContainer from './ResourceContainer';
import CreateResource from './CreateResourceForm'
import { Button } from 'semantic-ui-react';




class App extends Component {
  constructor(){
    super()

    this.state= {
      loggedIn: false,
      loggedInUserName: null,
      chosenCategory: ''
    }
  }

  login = async (loginInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/user/login', {    
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status === 200) {
      this.setState({
        loggedIn: true, 
        loggedInUserName: parsedLoginResponse.data.username
      })
    } else {
      console.log(parsedLoginResponse);
    }
  }

  register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/user/register', {
      method: "POST", 
      credentials: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedRegisterResponse = await response.json()

    if (parsedRegisterResponse.status === 201){
      this.setState({
        loggedIn: true, 
        loggedInUserEmail: parsedRegisterResponse.data.email
      })
    } else {
      console.log(parsedRegisterResponse);
    }
  }
  chooseResource = (resource) => {
    this.setState({
      resourceChosen: resource
    })
  }
render(){
  return (
    <div className="App">
    {
      this.state.loggedIn
      ?
      <Button onClick={()=>this.logout()}>Go AWOL</Button>
      :
      <LoginRegisterForm login={this.login} register={this.register}/>
    }
    {
      this.state.resourceChosen === ''
      ?
      <ResourceContainer chosenResource={this.chooseResource}/>
      :
      <CreateResource chosenResource={this.state.resourceChosen} chooseResource={this.chooseResource}/>
    }
    </div>
  )
}
}

export default App;
