import React, { Component } from 'react';
import { tournaments } from '../dummy_hardcoded_data';


import styles from '../scss-modules/tournaments-container/tournaments-container.module.scss';

import cx from 'classnames';


import { backendRootLink } from '../secret/config';
import axios from 'axios';
// import 'font-awesome/css/font-awesome.min.css';



class TournamentsContainer extends Component {

    state = {
        searchTournaments: false,
        searchresults: []
    }

    renderSearchTournamentPanel() {
        return (
            <div className = {styles.SearchPanel}>
                <h3>Find a tournament</h3><br/>
                <form className = {styles.SearchForm}>
                    <label>
                        TournamentName: 
                        <input type="text" name="name" id="TournamentName"/>
                    </label>
                    <label>
                        hostType:
                        <select name="hostType" id="hostType">
                            <option value="Organization">Organization</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </label>
                    <label>
                        hasStarted:
                        <select name="hasStarted" id="hasStarted">
                            <option value= {true}>yes</option>
                            <option value= {false}>no</option>
                        </select>
                    </label>
                    <label>
                        tournamentType:
                        <select name="tournamentType" id="tournamentType">
                            <option value="Team">Team</option>
                            <option value="Single">Single</option>
                        </select>
                    </label>
                    <label>
                        fromDate:
                        <input type="date" name="fromDate" id="fromDate"/>
                    </label>
                    <label>
                        toDate:
                        <input type="date" name="toDate" id="toDate"/>
                    </label>
                </form>
                <button onClick={this.searchTournaments}>Search</button><br/>
            </div>
        )
    }

    renderTournaments(results) {
        const all_tour = results.map((tournament, i) => {
            return (
                <div key={i} className = {styles.tournamentBox}>
                    <div className = {styles.tournamentInfoSection}>
                        <p>{tournament.name}</p>
                        <p>Teams: {tournament.amountOfTeams}</p>
                        <p>Date created: {new Date(tournament.dateCreated).toString()}</p>
                        <p>Date starting: {new Date(tournament.dateStarting).toString()}</p>
                        <p>Date finish: {tournament.dateFinished == null ? 'ongoing' : tournament.date_finished}</p>
                    </div>
                </div>
            )
        })


        return this.state.searchTournaments ?
        (<div className = {styles.tournamentDisplayPannel}>
                {all_tour}
        </div>) 
        :
        (<div className = {styles.tournamentDisplayPannel}>
                {all_tour}
        </div>) 
    }

    searchTournaments = (event) => {
        event.preventDefault();
        const TournamentName = document.getElementById("TournamentName").value
        const hostType = document.getElementById("hostType").value
        const hasStarted = document.getElementById("hasStarted").value
        const tournamentType = document.getElementById("tournamentType").value
        const fromDate = document.getElementById("fromDate").value
        const toDate = document.getElementById("toDate").value

        const data_to_submit = { TournamentName, hostType, hasStarted, tournamentType, fromDate, toDate}

        this.request_to_backend(data_to_submit).then((results) => {
            this.setState({
                searchresults: results.data,
                searchTournaments: true
            })
            console.log(results.data)
            
        }).catch((error) => {
            console.log(error)
        })
    }

    request_to_backend = (data_to_submit) => {
        return axios.get(`${backendRootLink}/searchTournament`, data_to_submit)
    }
 

    render() {
        return (
            <div className={styles.bg}>
                <div className = {cx("container-fluid", styles.container_frame)}>
                    <div className = "row">
                        <div className = {"col-4"}> {this.renderSearchTournamentPanel()} </div>
                        <div className = {"col-7"}> {this.renderTournaments(this.state.searchresults)} </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TournamentsContainer;