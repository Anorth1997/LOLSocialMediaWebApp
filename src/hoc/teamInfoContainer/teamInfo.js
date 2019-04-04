import React from 'react';

import cx from 'classnames';
import styles from '../../scss-modules/others/team_info.module.scss';


import RankImage from './../../Components/OtherComponents/rankImage';
import { Link } from 'react-router-dom';

const TeamInfo = (props) => {

    console.log(props);

    return (
        <div className={cx("container-fluid", styles.teamInfo)}>
            <div className="row">
                <div className="col-2">
                    {/* <img className={styles.teamIcon} src={require(`../../assets/images/${props.team.icon}`)} alt=""/> */}
                </div>
                <div className={cx("col-4", styles.teamName)}>
                    {props.team.name}
                </div>
                <div className={cx("col-4", styles.rankImageStyles)}>
                    Average rank
                    <RankImage 
                        rank={props.team.averageRank}
                        showInfo={true}
                    />
                </div>
                <div className={cx("col-2", styles.detailButton)}>
                    <Link to={`/team/${props.team._id}`}>
                        <button type="button" className={cx("btn btn-dark")}>Details</button>
                    </Link>
                
                </div>
            </div>
        </div>
    );
}

export default TeamInfo;