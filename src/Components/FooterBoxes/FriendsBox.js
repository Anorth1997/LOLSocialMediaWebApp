import React, { Component } from 'react';

import styles from '../../scss-modules/footer/friendList.module.scss';

import axios from 'axios';
import { backendRootLink } from '../../secret/config'
// import { getFriends }
import { changeCurrentActiveChat } from './../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cx from 'classnames';

class FriendsBox extends Component {

    state = {
        friends: []
    }

    componentWillMount() {

        const idsOfFriends = this.props.currUser.friends.currFriends.map((item) => {
            return item.friendId;
        })
        this.getFriends(idsOfFriends, (friends) => {
            console.log('here now')
            console.log(friends);
            this.setState({
                friends: friends
            })
        });
    }

    getFriends = (idsGiven, callback) => {
        axios.put(`${backendRootLink}/getUsersByIds`, {
            ids: idsGiven
        })
        .then(res => {
            callback(res.data)
        })
        .catch(err => {
            console.log('err getting friends')
        })
    }

    clickedFriend = (friendClicked) => {
        console.log(friendClicked)
    }

    render() {
        // this.props.currUser holds currUser
        console.log(this.props);

        return (
            <div className={styles.friendContainer}>
                {this.state.friends.map((friend, i) => {
                    if (friend.isOnline) {
                        return (
                            <div key={i} className={cx(styles.eachFriend)} onClick={() => this.clickedFriend(friend)}>
                                <img className={styles.profilePic} src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} alt=""/>
                                {friend.username}
                                <span style={{color: 'green', marginLeft: '5%'}}>
                                    Online!
                                </span>
                                
                            </div>
                        )
                    }
                })}
                {this.state.friends.map((friend, i) => {
                    if (!friend.isOnline) {
                        return (
                            <div key={i} className={cx(styles.eachFriend)} onClick={() => this.clickedFriend(friend)}>
                                <img className={styles.profilePic} src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} alt=""/>
                                {friend.username}
                            </div>
                        )
                    }
                })}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeCurrentActiveChat
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(FriendsBox);

