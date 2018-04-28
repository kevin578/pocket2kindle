import React, { Component } from 'react';
import './App.css';
class App extends Component {

  constructor(props) {
    super();
    this.state = {
      stories: [],
    }
}

  checkLogin = async ()=> {
    const response = await fetch('/api/checkLoggedin');
    const responseJSON = await response.json()
    if(!responseJSON.hasRequestToken) {
      this.getRequestToken();
    }
    else if (!responseJSON.hasAccessToken) {
      this.getAccessToken();
    }
    else {
      this.getStories();
    }
  }


  getRequestToken = ()=> {
   window.location = '/api/getRequestToken';
  }

  getAccessToken = ()=> {
    window.location = '/api/getAccessToken'
  }

  getStories = async ()=> {
    const response = await fetch('/api/getStories');
    const responseJSON = await response.json();
    console.log(responseJSON.list);
  }

  componentDidMount(){
    this.checkLogin()
  }

  render() {
    return (
      <div className="App">
        There will be articles
      </div>
    );
  }
}

export default App;
