import React, { Component } from 'react';

import styles from '../scss-modules/profile-page-container/profile-page-container.module.scss';

import cx from 'classnames';

import { connect } from 'react-redux';
import { getTournamentById } from '../actions/index';
import { bindActionCreators } from 'redux';


// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faMedal } from '@fortawesome/free-solid-svg-icons';

import RankImage from '../Components/OtherComponents/rankImage';
import TournamentProfileTabContent from '../Components/TournamentProfilePage/tournament_profile_tab_content.js';



class TournamentProfilePageContainer extends Component {

    
    componentWillMount() {
        // console.log(this.props.match.params.id)
        this.props.getTournamentById(this.props.match.params.id);
    }
    

    renderProfile = () => {
        if (this.props.tournament) {
            console.log(this.props)
            return (
            <div className={styles.profile}>
                <div className={styles.username}>
                    {this.props.tournament.name}
                </div>
            </div>
        );}
        
    }

    renderTabs = () => {
        if (this.props.tournament) {
            return (
                <TournamentProfileTabContent
                    {...this.props}
                />
            );
        } else {
            return null;
        }
    }


    render() {

        console.log(this.props);
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
         tournament: state.tournaments.tournament
     }
 }
 
 const mapDispatchToProps = (dispatch) => {
     return bindActionCreators({getTournamentById}, dispatch);
 }
 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(TournamentProfilePageContainer);