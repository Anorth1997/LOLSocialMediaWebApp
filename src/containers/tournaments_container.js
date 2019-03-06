import React, { Component } from 'react';
import { tournaments } from '../dummy_hardcoded_data';


import styles from '../scss-modules/tournaments-container/tournaments-container.module.scss';

import cx from 'classnames';
// import 'font-awesome/css/font-awesome.min.css';



class TournamentsContainer extends Component {

    state = {
        searchTournaments: false,
    }

    renderTournamentOptionPanel() {
        return (
            <div className = {styles.OptionPanel}>
                <h3>Join a tournament</h3><br/>
                <button>Alone</button><br/>
                <h4>Invite friends</h4>
            </div>
        )
    }

    renderTournaments(search) {
        const all_tour = tournaments.map((tournament, i) => {
            return (
                <div key={i} className = {styles.tournamentBox}>
                    <div className = {styles.tournamentInfoSection}>
                        <p>{tournament.id}</p>
                        <p>Teams: {tournament.num_teams}</p>
                        <p>Date created: {tournament.date_created}</p>
                        <p>Date starting: {tournament.date_starting}</p>
                        <p>Date finish: {tournament.date_finished == null ? 'ongoing' : tournament.date_finished}</p>
                    </div>
                </div>
            )
        })



        return search ?
        (<div className = {styles.tournamentDisplayPannel}>
                {all_tour}
        </div>) 
        :
        (<div className = {styles.tournamentDisplayPannel}>
                {all_tour}
        </div>) 
    }
 

    render() {

        return (
            <div className={styles.bg}>
                <div className = {cx("container-fluid", styles.container_frame)}>
                    <div className = "row">
                        <div className = {"col-4"}> {this.renderTournamentOptionPanel()} </div>
                        <div className = {"col-7"}> {this.renderTournaments(this.state.searchTournaments)} </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TournamentsContainer;