import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegistrationForm';
import CategoryContainer from './CategoryContainer';
import CategoryList from './CategoryList';
import ResourceContainer from './ResourceContainer';
import { Button } from 'semantic-ui-react';




class App extends Component {
  constructor(){
    super()

    this.state= {
      loggedIn: true,
      loggedInUserName: null,
      chosenCategory: ''
    }
  }

  login = async (loginInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/user/login/', {    
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
      console.log('Login failed');
      console.log(parsedLoginResponse);
    }
  }

  register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/organization/register/', {
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
        loggedInUserName: parsedRegisterResponse.data.username
      })
    } else {
      console.log('Registration failed');
      console.log(parsedRegisterResponse);
    }
  }
  chooseCategory = (category) => {
    this.setState({
      categoryChosen: category
    })
  }
render(){
  return (
    <div className="App">
      {
        this.state.loggedIn
        ?
        <Button onClick={()=>this.logout()}>Go AWOl</Button>
        :
        <LoginRegisterForm login={this.login} register={this.register}/>
        }
      {
        this.state.categoryChosen === ''
        ?
          <CategoryList chooseCategory={this.chooseCategory}/>
          :
          <ResourceContainer chosenCategory={this.state.categoryChosen} chooseCategory={this.chooseCategory}/>
      }
    </div>
  );
}
}

export default App;
