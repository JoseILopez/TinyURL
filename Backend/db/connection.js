/*
**   MONGODB Connection
*/

const mongoose = require('mongoose');

function connect(dbPath) {
  mongoose.connect(dbPath, null);
  mongoose.connection.on('error', (err) => { console.log(err); });
  console.log(`DATABASE :: Connected to database at ${dbPath}`);
}

module.exports = connect;
