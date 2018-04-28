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
    let storyArray = [];
    for (let key in responseJSON.list) {
      const obj = responseJSON.list[key]
      storyArray.push({
        item_id: key,
        title: obj.resolved_title,
        excerpt: obj.excerpt,
        img_url: obj.top_image_url
      })
  }
  this.setState({stories: storyArray});
  }

  componentDidMount(){
    this.checkLogin()
  }

  render() {
    return (
      <div className="App">
       { this.state.stories.map((item)=> {
         return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.excerpt}</p>
            <img src = {item.img_url} />
          </div>
        )
        }) }
      </div>
    );
  }
}

export default App;
