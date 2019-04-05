import React, { Component } from 'react';

import styles from '../scss-modules/profile-page-container/profile-page-container.module.scss';

import cx from 'classnames';

import { connect } from 'react-redux';
import { getUserByUsername } from '../actions/index';
import { bindActionCreators } from 'redux';


// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faMedal } from '@fortawesome/free-solid-svg-icons';

import RankImage from '../Components/OtherComponents/rankImage';
import UserProfileTabContent from '../Components/UserProfilePage/user_profile_tab_content';



class ProfilePageContainer extends Component {

    
    componentWillMount() {
        // console.log(this.props.match.params.id)
        
        this.props.getUserByUsername(this.props.match.params.id);
        console.log(this.props)
    }
    

    renderProfile = () => {
        // if (this.props.currUser) {
        //     console.log(this.props)
        //     return (
        //         <div className={styles.profile}>
        //             <img className={styles.profilePic} src={require(`../assets/images/${this.props.currUser.profile_pic}`)} alt=""/>
                    
        //             <div className={styles.username}>
        //                 {this.props.currUser.username}
        //             </div>

        //             <div className={styles.leagueAccountInfo}>
        //                 <i>{this.props.currUser.leagueUsername}</i> 
        //             </div>

        //             <RankImage 
        //                 rank={this.props.currUser.lolInfo.currentRank}
        //                 showInfo={true}
                        
        //             />


        //             <div className={cx("container-fluid", styles.tournamentOutcomes)}>
        //                 <div className={cx("row", styles.tournamentOutcomes)}>
        //                     <div className="col-xs-4">
        //                         <span className={styles.tournOutcome}>
        //                             <FontAwesomeIcon
        //                                 className={styles.goldTrophy}
        //                                 icon={faMedal}
        //                             />
        //                             20
        //                         </span>
        //                         <span className={styles.tournOutcome}>
        //                             <FontAwesomeIcon
        //                                 className={styles.silverTrophy}
        //                                 icon={faMedal}
        //                             />
        //                             40
        //                         </span>
        //                         <span className={styles.tournOutcome}>
        //                             <FontAwesomeIcon
        //                                 className={styles.medal}
        //                                 icon={faAward}
        //                             />
        //                             15
        //                         </span>

        //                     </div>
        //                 </div>

        //             </div>           
        //         </div>
        //     );
        // }
        if (this.props.user) {
            console.log(this.props)
            return (
            <div className={styles.profile}>
                <img className={styles.profilePic} src={require(`../assets/images/${this.props.user.profile_pic}`)} alt=""/>
                
                <div className={styles.username}>
                    {this.props.user.username}
                </div>

                <div className={styles.leagueAccountInfo}>
                    <i>{this.props.user.leagueUsername}</i> 
                </div>

                <RankImage 
                    rank={this.props.user.currentRank}
                    showInfo={true}
                    
                />         
            </div>
        );}
    }

    renderTabs = () => {
        if (this.props.user) {
            return (
                <UserProfileTabContent
                    {...this.props}
                   // loggedInUser={this.props.loggedInUser}
                />
            );
        } else {
            return null;
        }
    }


    render() {

        // console.log(this.props);
        // const userProfilePic = this.props.currUser ? `../assets/images/${this.props.currUser.profile_pic}`: null;

        return (
            <div className={cx("container-fluid", styles.userProfile)}> 
                <div className="row">
                    <div className={cx("col-md-3", styles.leftSide)}>
                        {this.renderProfile()}
                    </div>
                    <div className="col-md-9">
                        {this.renderTabs()}
                    </div>
                </div>
                
                
            </div>
        );
    }

}


const mapStateToProps = (state) => {
     return {
         currUser: state.currUser.info,
         user: state.users.user
     }
 }
 
 const mapDispatchToProps = (dispatch) => {
     return bindActionCreators({getUserByUsername}, dispatch);
 }
 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);