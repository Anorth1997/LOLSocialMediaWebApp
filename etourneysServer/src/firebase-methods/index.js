const firebase = require('firebase/app');
const sc = require('../../secret/secret');
require('firebase/database');

const firebaseDB = firebase.initializeApp(sc.firebaseConfig);

/**
 * Send a message to a conversation that is currently running.
 * 
 * @param {*} message Message to send
 * @param {*} conversationId Conversation Id found in user's object
 * @param {*} userId The sender's Id
 */
const createConvoId = () => {

    const tempVal = firebaseDB.database().ref(`messages/`).push();
    const key = tempVal.key;
    return key;
    // console.log(tempVal.key)
}


module.exports = {
    firebaseDB,
    createConvoId
}