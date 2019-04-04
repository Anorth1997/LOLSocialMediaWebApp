import React, { Component } from 'react';

import cx from 'classnames';
import styles from '../../scss-modules/others/team_info.module.scss';

import { Link, Redirect } from 'react-router-dom';
import RankImage from './../../Components/OtherComponents/rankImage';
import { teamAcceptIncomingRequest } from './../../actions/index';

class IncomingUserInfo extends Component  {

    state= {
        redirect: false
    }

    render () {
        if (this.state.redirect) {
            return (<Redirect to={`/team/${this.props.teamId}`} />);
        }
        return (
            <div className={cx("container-fluid", styles.teamInfo)}>
                <div className="row">
                    <div className={cx("col-1", styles.rankImageStyles)}>
                    </div>
                    <div className={cx("col-3", styles.teamName)}>
                        {this.props.user.username}
                    </div>
                    <div className={cx("col-6", styles.rankImageStyles)}>
                        Current Rank
                        <RankImage 
                            rank={this.props.user.lolInfo.currentRank}
                            showInfo={true}
                        />
                    </div>
                    
                    <div className={cx("col-2", styles.detailButton)}>
                    <Link to={`/profile/${this.props.user.username}`}>
                        <button type="button" className={cx("btn btn-dark")}>Details</button>
                    </Link>
                    </div>
                    
                </div>
                <div className="row">
                    <div className={cx("col-6", styles.detailButton)}>
                        <button type="button" onClick={this.acceptRequest.bind(this)} className={cx("btn btn-dark")}>Accept</button>
                    </div>
                    <div className={cx("col-6", styles.detailButton)}>
                        <button type="button" className={cx("btn btn-dark")}>Reject</button>
                    </div>
                </div>
            </div>
        );
    }
    
    acceptRequest = () => {
        teamAcceptIncomingRequest(this.props.hostId, this.props.user._id, this.props.teamId)
        this.setState({
            redirect: true
        })
    }
    
}

export default IncomingUserInfo;