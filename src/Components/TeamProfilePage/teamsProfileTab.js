import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/team-tab.module.scss';

import { getAllTeams } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import TournamentInfo from '../../hoc/TournamentInfoContainer/tournInfo';
import TeamInfo from '../../hoc/teamInfoContainer/teamInfo';

class TeamsUserProfileTab extends Component {


    
    componentWillMount() {

        const _teams_participating_ids = this.props.teams.currTeams.map( (item) => {
            return item;
        })

        this.props.getAllTeams(_teams_participating_ids);
        // this.props.getAllTournaments(tourns_participated_ids, 'participating');
    }
    


    renderTeams = () => {

        let teams_to_render = this.props.server_response.teams;

        if (teams_to_render) {
            return (
                <div>
                    {teams_to_render.map((item, i) => {
                        return (
                            <div key={i}>
                                <TeamInfo team={item} />
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {

        return (
            <div className={cx(styles.teamTab)}>
                {this.renderTeams()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        server_response: {
            teams: state.teams.teams
        }
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllTeams}, dispatch);
}
 
 
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamsUserProfileTab);
 

