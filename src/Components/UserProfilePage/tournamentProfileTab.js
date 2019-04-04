import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/tournament-tab.module.scss';

import {getTournamentById, getAllTournaments} from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TournamentInfo from '../../hoc/TournamentInfoContainer/tournInfo';

class TournamentUserProfileTab extends Component {


    
    componentWillMount() {

        /*const tourns_participated_ids = this.props.tournaments_participated.map( (item) => {
            return item.tournament_id;
        })*/
        if (this.props.tournaments.currTournaments.length > 0) {
            this.props.getAllTournaments(this.props.tournaments.currTournaments);
        }
        
        /*this.props.getAllTournaments(tourns_participated_ids, 'participating');*/
    }
    


    renderTournaments = (type) => {

        let tourn_to_render = null;
        if (type === 'participating') {
            tourn_to_render = this.props.server_response.currTournaments;
        }
        console.log(tourn_to_render)
        if (tourn_to_render) {
            return (
                <div>
                    {tourn_to_render.map( (item, i) => {
                        return (
                            <div key={i}>
                                <TournamentInfo tournament={item}/>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {

        return (
            <div className={styles.tournamentTab}>
                <div className={cx(styles.tournamentsParticipating)}>
                    {this.renderTournaments('participating')}
                </div>

                {/* <div className={styles.tournamentsParticipated}>
                    {this.renderTournaments('participated')}
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.tournaments)
    return {
        server_response: {
            currTournaments: state.tournaments.currTournaments
            //,tournaments_participated_in: state.tournaments.tourns_participated
        }
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getTournamentById, getAllTournaments}, dispatch);
}
 
 
 
export default connect(mapStateToProps, mapDispatchToProps)(TournamentUserProfileTab);
 

