const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js')
const db = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!

  var user = req.body.user;
  var repos = [];
  console.log('returning the current db:')
  // db.find();
  helper.getReposByUsername(user)
  .then(function(response) {
    for (var x = 0; x < response.data.length; x++) {
      db.save(response.data[x]);
    }
    res.status(201).send('Username saved');
  }).catch(function(error) {
    console.log('error:', error);
    res.status(400).send('oops')
  })

  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var repos = [];
  db.Repo.find({ }, { }, {skip: 0, limit: 25, sort:{watchers:-1}}).then((data) => {
    res.status(200).send(data);
  });


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

