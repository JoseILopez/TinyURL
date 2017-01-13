/*
**  Short URL Model
*/


const mongoose = require('mongoose');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');

const Schema = mongoose.Schema;

const charMap = 'ABCDEFGHIJLKMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const maxShortNameLength = 4;


// Schema

const shortURLSchema = new Schema({
  url: String,
  shortName: String,
  https: Boolean,
});


/*
** STATIC FUNCTIONS
*/


/* Checks if URL already exists in the database
   This promise returns an array, [0] = Document (given or found)
   [1] = Boolean indicating if it found a document already. */

shortURLSchema.statics.checkIfURLexists = (doc) => {
  return new Promise((resolve) => {
    const url = doc.url;
    const model = mongoose.model('shortURL', shortURLSchema);

    model.findOne({ url }, (err, foundDoc) => {
      if (err) {
        throw err;
      }

      if (!foundDoc) {
        resolve([doc, false]);
      }
      resolve([foundDoc, true]);
    });
  });
};


// It returns the given document if alreadyFound is true. Otherwise it adds it to the database.

shortURLSchema.statics.createDoc = (docData) => {
  return new Promise((resolve) => {
    const doc = docData[0];
    const alreadyFound = docData[1];

    if (alreadyFound) {
      resolve(doc);
      return;
    }

    doc.save((err) => {
      if (err) {
        throw err;
      }
    });

    resolve(doc);
  });
};


// Returns all documents, a single document if query is provided, or a HTTP 404.

shortURLSchema.statics.findDoc = (shortName, url) => {
  return new Promise((resolve) => {
    const model = mongoose.model('shortURL', shortURLSchema);

    // Check parameters (shortName has priority over URL. If provided it ignores the URL)

    if (!shortName && !url) {

      // Send all

      model.find(sendData);

    } else if (url && !shortName) {

      // Search by URL

      model.findOne({ url }, sendData);

    } else {

      // Search by shortName

      model.findOne({ shortName }, sendData);
    }

    function sendData(err, data) {
      if (err) {
        throw err;
      }

      if (!data) {
        resolve(constants.STATUS.NOTFOUND);
        return;
      }
      resolve(data);
    }
  });
};


// Generates the unique shortName for redirection using charMap characters.

shortURLSchema.statics.generateShortName = (shortName) => {
  let uniqueShortName = shortName;

  if (uniqueShortName === undefined || uniqueShortName.length !== maxShortNameLength) {
    uniqueShortName = '';
  }

  for (let i = 0; i < maxShortNameLength; i += 1) {
    const index = Math.floor(Math.random() * charMap.length);

    uniqueShortName += charMap.charAt(index);
  }

  return uniqueShortName;
};


// Removes the specified document if found. If not returns a HTTP 400

shortURLSchema.statics.removeDoc = (shortName) => {
  return new Promise((resolve) => {
    const model = mongoose.model('shortURL', shortURLSchema);

    model.findOneAndRemove({ shortName }, (err, doc) => {
      if (err) {
        throw err;
      }

      if (!doc) {
        resolve(constants.STATUS.BAD_REQUEST);
        return;
      }

      resolve(constants.STATUS.OK);
    });
  });
};


// Wipes the database and adds the example document.

shortURLSchema.statics.resetDB = () => {
  return new Promise((resolve) => {
    const model = mongoose.model('shortURL', shortURLSchema);

    // Remove all

    model.remove({}, (err) => {
      if (err) {
        throw err;
      }

      // Create default document

      const defDoc = model({
        url: constants.DEFAULT.URL,
        shortName: constants.DEFAULT.SHORT_NAME,
        https: constants.DEFAULT.HTTPS,
      });

      // Add it to the database

      model.createDoc([defDoc, false])
           .then((doc) => { resolve(doc); })
           .catch(utils.ReturnError);
    });
  });
};


/* Updates the document with the matching shortName, if found returns HTTP 200.
   If not returns HTTP 404.*/

shortURLSchema.statics.updateDoc = (shortName, url, https) => {
  return new Promise((resolve) => {
    const model = mongoose.model('shortURL', shortURLSchema);

    model.findOneAndUpdate({ shortName }, { $set: { url, https } }, (err, doc) => {
      if (err) {
        throw err;
      }

      if (!doc) {
        resolve(constants.STATUS.NOTFOUND);
        return;
      }
      resolve(constants.STATUS.OK);
    });
  });
};


/* Generates new shortName if the given one is invalid or already exists.
   Receives and returns an array with the same structure as
   checkIfURLexists. */

shortURLSchema.statics.validateShortName = (docData) => {
  return new Promise((resolve) => {
    const doc = docData[0];
    const alreadyFound = docData[1];

    // If document was found by URL, skip validation and return that document.

    if (alreadyFound) {
      resolve([doc, alreadyFound]);
      return;
    }

    /* If not already found, generate the shortName and check against other
       shortNames to avoid duplicates */

    const model = mongoose.model('shortURL', shortURLSchema);

    let isValid = false;
    let newShortName = doc.shortName;

    // Get all shortNames currently in the database

    let allShortNames;

    model.distinct('shortName', (err, data) => {
      if (err) {
        throw err;
      }

      allShortNames = data;

      // Keep generating a new shortName until a unique one is found.

      while (isValid === false) {

        // Check if current shortName is valid first. If not, generate.

        if (newShortName === undefined || newShortName.length !== maxShortNameLength) {
          newShortName = model.generateShortName();
          continue;
        }

        /* Check if current shortName exists in the database. If not found,
           break out of the loop and continue with document creation. */

        if (allShortNames.indexOf(newShortName) < 0) {
          isValid = true;
        } else {
          newShortName = model.generateShortName();
        }
      }

      // Define new document with the given parameters and its unique shortName.

      const newDoc = new model({
        url: doc.url,
        https: doc.https,
        shortName: newShortName,
      });

      resolve([newDoc, false]);
    });
  });
};


module.exports = mongoose.model('shortURL', shortURLSchema);
