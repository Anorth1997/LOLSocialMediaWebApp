var firebase = require('firebase/app');
var sc = require("./secret/config");
require("firebase/database");

const firebaseDB = firebase.initializeApp(sc.firebaseConfig);


// firebaseDB.database().ref('messages/someID').push().set({
//     message: 'pushed message'
// })


/**
 * Send a message to a conversation that is currently running.
 * 
 * @param {*} message Message to send
 * @param {*} conversationId Conversation Id found in user's object
 * @param {*} userId The sender's Id
 */
const sendMessage = (message, conversationId, userId, callback, updateCallback) => {

    const tempVal = firebaseDB.database().ref(`messages/${conversationId}`).push();
    // console.log(tempVal.key)

    firebaseDB.database().ref(`messages/${conversationId}/${tempVal.key}`).set({
        message: message,
        dateSent: new Date().getTime(),
        fromUser: userId
    }, () => {
        callback(userId);
        updateCallback(conversationId);
    })
}

/**
 * Register am on child_added listener to the component
 * 
 * @param {*} conversationId conversation Id begin written to
 * @param {*} callback Callback function that will be triggered when something changes
 */
const registerMessageListener = (conversationId, callback) => {
    firebaseDB.database().ref(`messages/${conversationId}`).on('value', (snapshot) => {
        // console.log('child added')
        // console.log(snapshot.val())
        callback(snapshot.val());
    })
}

const unregisterMessageListener = (conversationId) => {
    firebaseDB.database().ref(`messages/${conversationId}`).off('value');
}

const registerMessageListenerForChildAdded = (conversationId, callback) => {
    firebaseDB.database().ref(`messages/${conversationId}`).on('child_added', (snapshot) => {
        // console.log('child added')
        // console.log(snapshot.val())
        callback(snapshot.val());
    })
}



const getAllMessages = (conversationId, callback) => {
    firebaseDB.database().ref(`messages/${conversationId}`).once('value')
    .then((snapshot) => {
        console.log('got all of the messages')
        // console.log(snapshot.val())
        callback(snapshot.val())
        // return snapshot.val();
    })
}


// sendMessage('Hello, friend.', '0x4325rds4362d', '5c8a86f33563a6938acf0661');
// sendMessage('Hello there brother.', '0x4325rds4362d', '5c8a86f37ad8956ca01b6aed');
// sendMessage('How are you today?', '0x4325rds4362d', '5c8a86f33563a6938acf0661');

export {
    firebaseDB,
    sendMessage,
    registerMessageListener,
    unregisterMessageListener,
    registerMessageListenerForChildAdded,
    getAllMessages
}


// checking all messages
// firebaseDB.database().ref('messages/someID').once('value').then((snapshot) => {
    


//     for (let key in snapshot.val()) {
//         console.log(snapshot.val()[key].message)
//     }
    
// })


// firebaseDB.database().ref('messages/hkjhkhkhhkj').set({
//     message: 'hello'
// });
