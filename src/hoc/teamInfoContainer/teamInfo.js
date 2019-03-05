import React from 'react';

import cx from 'classnames';
import styles from '../../scss-modules/others/team_info.module.scss';


const TeamInfo = (props) => {

    console.log(props);

    return (
        <div className={cx("container-fluid", styles.teamInfo)}>
            <div className="row">
                <div className="col-6">
                    {props.team.name}
                </div>
                <div className="col-6">
                    {props.team.average_rank}
                </div>
            </div>
        </div>
    );
}

export default TeamInfo;