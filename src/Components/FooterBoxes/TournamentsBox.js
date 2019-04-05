import React, { Component } from 'react';

import styles from '../../scss-modules/footer/friendList.module.scss';

import axios from 'axios';
import { backendRootLink } from '../../secret/config'
// import { getFriends }
import { changeCurrentActiveChat } from './../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cx from 'classnames';
import { Link } from 'react-router-dom';

class TournamentsBox extends Component {

    state = {
        tournaments: []
    }

    componentWillMount() {
        //console.log(this.props.currUser)
        const ids = this.props.currUser.tournaments.currTournaments;
        //console.log(ids)
        this.getTournaments(ids, (tournaments) => {
            this.setState({
                tournaments: tournaments
            })
        });
    }

    getTournaments = (ids, callback) => {
        axios.put(`${backendRootLink}/getTournamentsByIds`, {
            ids: ids
        })
        .then(res => {
            //console.log(res.data)
            callback(res.data)
        })
        .catch(err => {
            console.log('err getting friends')
        })
    }

    clickedTournament = (tournament) => {
        //console.log(tournament)
    }

    render() {
        // this.props.currUser holds currUser
        console.log(this.props);

        return (
            <div className={styles.friendContainer}>
                {this.state.tournaments.map((tournament, i) => {
                    return (
                        <Link key={'jumptotour'} to={`/tournament/${tournament._id}`}>
                            <div key={i} className={cx(styles.eachFriend)} onClick={() => this.clickedTournament(tournament)}>
                                {/* <img className={styles.profilePic} src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} alt=""/> */}
                                {tournament.name}
                                
                            </div>
                        </Link>
                    )
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

export default connect(null, mapDispatchToProps)(TournamentsBox);

