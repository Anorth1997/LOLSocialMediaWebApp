import React, { Component } from 'react';

// import styles from '../../scss-modules/components//widgets/messageBox.module.scss';
import styles from '../../scss-modules/footer/messageBox.module.scss';

import FormFields from '../../widgets/Forms/formfields';

import { sendMessage, registerMessageListener, getAllMessages, unregisterMessageListener, registerMessageListenerForChildAdded } from '../../firebase';

import asynco from 'async';

import { connect } from 'react-redux';
import OrderedList from './../../widgets/OrderedList/orderedList';


class MessageBox extends Component {

    state = {
        messages: [],
        allMessages: [],
        activeChat: null,
        formData: {
            message: {
                element: 'input',
                value: '',
                label: false,
                labelText: '',
                config: {
                    name: 'message_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true,
                    rows: 5
                },
                validation: {
                    required: false,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        });
    }

    submitMessage = (e) => {
        e.preventDefault();
        // console.log(this.state.formData.message.value)
        // console.log('sending message')
        console.log(this.state)
        if (this.state.formData.message.value.length > 0) {
            const friend = this.props.currUser.friends.currFriends.find((friend) => {return friend.friendId === this.props.activeChat})
            sendMessage(this.state.formData.message.value, friend.convoId, this.props.currUser._id, this.clearMessage, this.updateList)
        }
    }

    updateList = (convoId) => {
        console.log('updating list')

        let messages = this.state.allMessages.find((item) => {
            return item.convoId === convoId
        })
        console.log('messages')
        console.log(messages)

        this.setState({
            messages: messages.messages
        })
    }

    componentWillMount() {
        
        asynco.each(this.props.currUser.friends.currFriends, (friend, callback) => {

            console.log('processing friend: ', friend)

            registerMessageListener(friend.convoId, (snapshot) => {
                console.log('the snapshot')
                console.log(snapshot)
                let messages = [];

                for (let key in snapshot) {
                    messages.push(snapshot[key])
                }
                messages.reverse();
                console.log('in brunt')
                console.log(messages)

                console.log('looking at allMessages')
                const foundIndex = this.state.allMessages.findIndex((item) => {
                    return item.convoId === friend.convoId
                })
                console.log('index found:', foundIndex)
                // const newMessages = this.state.allMessages[foundIndex].messages = [];
                // const newMessages = this.state.allMessages.splice(foundIndex, 1);
                // const foundVal = this.state.allMessages.find((item) => {
                    // console.log(item)
                    // return item.convoId === friend.convoId
                // })

                if (foundIndex >= 0) {
                    console.log('found the value')
                    // console.log(foundVal)
                    console.log(this.state.allMessages[foundIndex])
                    this.state.allMessages[foundIndex].messages = messages;
                    this.state.messages = messages;
                    this.forceUpdate();
                    // foundVal.messages = messages
                    // this.forceUpdate();
                    // this.setState({
                    //     allMessages: this.state.allMessages [...this.state.allMessages, foundVal]
                    // })
                } else {
                    console.log('didnt find the value')
                    this.setState({
                        allMessages: [...this.state.allMessages,
                            {
                                convoId: friend.convoId,
                                convoWith: friend.friendId,
                                messages: messages
                            }]
                    })
                }

            })
            callback();
        }, function(err) {
            if (!err) {
                console.log('all files loaded');

            }
        })
        console.log('after component will mount');

    }

    changeConvo = (currentActiveChat) => {
        console.log('changing convo')
        this.state.allMessages.forEach((messageObj) => {
            if (messageObj.convoWith === currentActiveChat) {
                this.setState({
                    messages: messageObj.messages,
                    activeChat: currentActiveChat
                }, () => {
                    console.log('finishing changin convo')
                })
            }
        })
    }

    clearMessage = (userSentFrom) => {
        if (userSentFrom === this.props.currUser._id) {
            let value = this.state.formData.message;
            value.value = '';
            this.setState({
                value
            })
        }
    }


    shouldComponentUpdate(newProps, nextState) {
        // console.log('updating');
        // console.log(this.props.activeChat)
        if (newProps.activeChat !== this.props.activeChat) {
            this.changeConvo(newProps.activeChat)
        }
        return true;
    }    

    render() {

        console.log(this.props)
        console.log(this.state)

        // if (!this.state.activeChat && this.props.activeChat && !this.everChangedConvo) {this.changeConvo()}
        // if (this.state.activeChat && this.props.activeChat && (this.state.activeChat != this.props.activeChat)) {this.changeConvo()}

        return (
            <div>
                        
                <OrderedList 
                    messages={this.state.messages}
                    userId={this.props.currUser._id}
                />

                <form onSubmit={this.submitMessage} className={styles.formStyle}>
                    <FormFields
                        formData={this.state.formData}
                        onblur={null}
                        change={(newState) => {
                            this.updateForm(newState);
                            // console.log(newState);
                        }}
                        styles={styles}
                    />
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeChat: state.userUiReducer.activeChat
    }
}

export default connect(mapStateToProps, null)(MessageBox);
