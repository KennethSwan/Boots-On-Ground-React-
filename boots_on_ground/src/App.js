import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegistrationForm';
import { Button } from 'semantic-ui-react';



class App extends Component {
  constructor(){
    super()

    this.state= {
      loggedIn: false,
      loggedInUserName: null
    }
  }

  login = async (loginInfo) => {
    console.log(process.env.REACT_APP_API_URL + '/user/login');
    const response = await fetch(process.env.REACT_APP_API_URL + '/user/login', {     
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 200) {
      this.setState({
        loggedIn: true, 
        loggedInUserName: parsedLoginResponse.data.username
      })
    }
    else {
      console.log("Log in Failed: !");
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

    if (parsedRegisterResponse.status.code === 201){
      this.setState({
        loggedIn: true, 
        loggedInUserEmail: parsedRegisterResponse.data.email
      })
    } else {
      console.log("Registration failed: ");
      console.log(parsedRegisterResponse);
    }
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
    </div>
  );
}
}

export default App;
