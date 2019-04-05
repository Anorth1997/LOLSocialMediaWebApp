const mongoose = require('mongoose');
const sc = require('../../secret/secret');
// const sc = require('../../secret/secret')

mongoose.Promise = global.Promise;
// const urlConnection = `mongodb+srv://${sc.mongoAdminUser}:${sc.mongoAdminPw}@etourncluster-vkzur.mongodb.net/${sc.clusters.etournamentCluster}?retryWrites=true`
const urlConnection = `mongodb://localhost:27017/etourneys`;

mongoose.connect(urlConnection, { useNewUrlParser: true, useCreateIndex: true})
.then(() => console.log('MongoDB connected'))
.catch(err => {console.log(err)})
