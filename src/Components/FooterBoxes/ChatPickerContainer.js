import React from 'react';

// import styles from '../../scss-modules/components/widgets/chatPicker.module.scss';
import styles from '../../scss-modules/footer/chatPicker.module.scss';

// import { users } from '../../dummy_db';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { bindActionCreators } from 'redux';
import { changeCurrentActiveChat } from '../../actions/index';
import { connect } from 'react-redux';


const ChatPickerContainer = (props) => {

    // console.log(props.friends.currFriends.map())

    const template = props.friends.currFriends.map((friend, i) => {
 
            return (
                <div className={styles.friendMessageContainer}
                    style={{background: props.activeChat === friend.friendId ? 'rgb(39, 39, 39)' : null}}
                    onClick={(event) => {
                        event.stopPropagation();
                        props.changeCurrentActiveChat(friend.friendId);
                        // props.setCurrentlyViewedFriend(friend.friendId);
                        // console.log(event)
                        console.log(`clicked chat button for user ${friend.friendId}`)
                    }}
                    key={i}>
                    {friend.friendUsername}
                    <FontAwesomeIcon 
                        className={styles.closeButton}
                        icon={faTimes}
                        onClick={(event) => {
                            event.stopPropagation();
                            // console.log(event)
                            console.log('closed')
                            // must set the user's isOpen to false
                        }}
                    />
                </div>
            )
    })


    return (
        <div className={styles.openMessagesContainer}>
            {template}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeChat: state.userUiReducer.activeChat
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeCurrentActiveChat
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPickerContainer);