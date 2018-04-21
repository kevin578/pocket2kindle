import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
class App extends Component {

  loginAction = ()=> {
    axios.post('http://localhost:5000/https://getpocket.com/v3/oauth/request', {
      
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      params: {
        consumer_key: '76779-2d1f99177e5c5324c1846fca',
        redirect_uri: '/'
      }
    }).then(()=> {
      console.log('done');
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick = {this.loginAction}>Sign in</button>
      </div>
    );
  }
}

export default App;
