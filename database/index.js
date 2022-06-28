const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  url: String,
  author: String,
  authorUrl: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  starred: Number,
  watchers: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);
// repoSchema.path('name').index({ unique: true });

let save = ( repo ) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var doc = new Repo();
  doc.name = repo.name;
  doc.url = repo.html_url;
  doc.author = repo.owner.login;
  doc.authorUrl = repo.owner.html_url;
  doc.description = repo.description;
  doc.createdAt = repo.created_at;
  doc.updatedAt = repo.updated_at;
  doc.starred = repo.stargazers_count;
  doc.watchers = repo.watchers_count;
  doc.forks = repo.forks_count;
  // Repo.findOneAndUpdate(
  //   {name: doc.name},
  //   {upsert: true, returnNewDocument: true}
  // );
  doc.save(doc, (err) => {
    if (err) {
      console.log(doc.name + ' by ' + doc.author + ' already exists in database');
    } else {
      console.log(doc);
    }

  });
  // console.log(doc.name);
  // Repo.count({}, function(error, numOfDocs) {
  //   console.log(numOfDocs)
  // })
  // find();
  // Repo.find({})
}

// let find = ( ) => {
//   var result = [];
//   const docs = Repo.find({ }, { }, {skip: 0, limit: 5, sort:{watchers:-1}}, (err, docs) => {
//     if (err) {
//       console.log(err);
//     }
//     // console.log('found', docs)
//     console.log(docs);
//     return docs;
//     }
//   )
//   // .then(console.log('async:', docs));
//   // console.log('docs:', docs.options);
// }

module.exports.save = save;
// module.exports.find = find;
module.exports.Repo = Repo;