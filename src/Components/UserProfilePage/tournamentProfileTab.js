import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/tournament-tab.module.scss';

import {getTournamentById, getAllTournaments} from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TournamentUserProfileTab extends Component {


    
    componentWillMount() {

        // console.log(this.props.tournaments_participating[0])

        const tourns_participating_ids = this.props.tournaments_participating.map( (item) => {
            return item.tournament_id;
        })

        const tourns_participated_ids = this.props.tournaments_participated.map( (item) => {
            return item.tournament_id;
        })

        this.props.getAllTournaments(tourns_participating_ids, 'participated');
        this.props.getAllTournaments(tourns_participated_ids, 'participating');
    }
    


    renderTournaments = (tournaments) => {

    }

    render() {

        // console.log(this.state);
        console.log(this.props)

        return (
            <div className={styles.tournamentTab}>
                <div className={styles.tournamentsParticipating}>
                    {this.renderTournaments()}
                </div>

                <div className={styles.tournamentsParticipated}>
                    {this.renderTournaments()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.currUser.info)
    return {
        server_response: {
            tournaments_participating_in: state.tournaments.tourns_participating,
            tournaments_participated_in: state.tournaments.tourns_participated
        }
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getTournamentById, getAllTournaments}, dispatch);
}
 
 
 
export default connect(mapStateToProps, mapDispatchToProps)(TournamentUserProfileTab);
 

