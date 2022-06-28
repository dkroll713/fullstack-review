import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  getRepos() {
    console.log('getting repos . . .')
    var newRepos = JSON.parse(JSON.stringify(this.state.repos))
    axios.get('/repos')
    .then((response) => {
      console.log('setting state'),
      this.setState({
        repos: response.data,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getRepos();
    // setInterval(this.getRepos, 2000)
  }

  search (term) {
    console.log(`${term} was searched`);

    console.log('\nsending get request to server. . .')
    axios.post('/repos', {"user": term})
    .then(function(response) {
      console.log('response in client:', response.data);
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(this.getRepos);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));