import React, { Component } from 'react';
import './App.css';
class App extends Component {

  constructor(props) {
    super();
    this.state = {
      stories: []
    }
  }


  loginAction = ()=> {
  
    fetch('api/register')
    .then((response)=> {
      return response.json();
    })
    .then((response)=> {
      this.setState({stories: response.list})
      this.state.map((item)=> {
        console.log(item);
    })
  })
  }

  componentDidMount(){
    this.loginAction()
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
