const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = ( user ) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  var url = 'https://api.github.com/users/' + user + '/repos'
  console.log('url in helper:', url)
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios.request(options);
}

module.exports.getReposByUsername = getReposByUsername;