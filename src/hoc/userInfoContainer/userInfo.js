import React from 'react';

import cx from 'classnames';
import styles from '../../scss-modules/others/team_info.module.scss';

import { Link } from 'react-router-dom';
import RankImage from './../../Components/OtherComponents/rankImage';

const UserInfo = (props) => {

    console.log(props);

    return (
        <div className={cx("container-fluid", styles.teamInfo)}>
            <div className="row">
                <div className="col-1">
                    {/* <img className={styles.teamIcon} src={require(`../../assets/images/${props.team.icon}`)} alt=""/> */}
                </div>
                <div className={cx("col-3", styles.teamName)}>
                    {props.user.username}
                </div>
                <div className={cx("col-6", styles.rankImageStyles)}>
                    Current Rank
                    <RankImage 
                        rank={props.user.lolInfo.currentRank}
                        showInfo={true}
                    />
                </div>
                <div className={cx("col-2", styles.detailButton)}>
                <Link to={`/profile/${props.user.username}`}>
                    <button type="button" className={cx("btn btn-dark")}>Details</button>
                </Link>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;