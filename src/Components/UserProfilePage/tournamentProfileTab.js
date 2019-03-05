import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/tournament-tab.module.scss';

import {getTournamentById, getAllTournaments} from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TournamentInfo from '../../hoc/TournamentInfoContainer/tournInfo';

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
    


    renderTournaments = (type) => {

        let tourn_to_render = null;
        if (type === 'participating') {
            tourn_to_render = this.props.server_response.tournaments_participating_in;
        } else {
            tourn_to_render = this.props.server_response.tournaments_participated_in;
        }

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

        // console.log(this.state);
        console.log(this.props)

        return (
            <div className={styles.tournamentTab}>
                <div className={styles.tournamentsParticipating}>
                    {this.renderTournaments('participating')}
                </div>

                <div className={styles.tournamentsParticipated}>
                    {this.renderTournaments('participated')}
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
 

