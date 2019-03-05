import React from 'react';

import styles from '../../scss-modules/others/tournament_info.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

import cx from 'classnames';

const TournamentInfo = (props) => {

    console.log(props);

    return (
        <div className={cx("container-fluid", styles.tournInfo)}>
            <div className="row">
                <div className="col-6">
                    {props.tournament.tourn_name}

                    <div>
                        <FontAwesomeIcon
                            className={styles.numTeamsParticipating}
                            icon={faUserFriends}
                        /> {props.tournament.num_teams}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentInfo;