import React from 'react';

import styles from '../../scss-modules/others/tournament_info.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const TournamentInfo = (props) => {

    // console.log(props);

    return (
        <div className={cx("container-fluid", styles.tournInfo)}>
            <div className="row">
                <div className="col-6">
                    {props.tournament.name}

                    <div>
                        <FontAwesomeIcon
                            className={styles.numTeamsParticipating}
                            icon={faUserFriends}
                        /> {props.tournament.participants.currParticipants.length}
                    </div>
                </div>
                <div className="col-6">
                    <FontAwesomeIcon
                            className={styles.numTeamsParticipating}
                            icon={faCalendarAlt}
                        /> {new Date(props.tournament.dateStarting).toDateString()}
                    <div>  
                        <Link to={`/tournament/${props.tournament._id}`}>
                        <button type="button" className={cx("btn btn-dark")}>Details</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentInfo;