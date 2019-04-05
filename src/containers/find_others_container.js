import React, { Component } from 'react';

import styles from '../scss-modules/find-container/find-container.module.scss';
import { riotApiKey, rootRiotApiLink, backendRootLink } from '../secret/config';
import axios from 'axios';

// import 'font-awesome/css/font-awesome.min.css';

//
class FindContainer extends Component{

    state = {
        showPlayers: false,
        searched_players: []
    }

    renderPlayers(show) {
        const players = this.state.searched_players.map((i) => {
            return (
                    <ul className={styles.playerBox}>
                        <li className={styles.playerIconContainer}>
                            <img className={styles.playerIcon} src={i.profile_pic} alt="profile pic"></img>

                        </li>
                        <li className={styles.playerNameSection}>
                            <p>{i.username}</p>
                            <p>{i.leagueUsername}</p>
                        </li>
                        <li className={styles.inviteSection}>
                            <button className={styles.inviteButton}>Invite</button>
                            <p>Rank: PlatinumVI</p>
                        </li>
                    </ul>
            )
        });

        if (show){
            const playerPannel = document.createElement('div');
            playerPannel.className = styles.playerDisplayPannel;
            return (
                <div className={styles.playerDisplayPannel}>{players}</div>
            )
        }
    }
        

    renderSearchPanel() {
        return (
            <div className={styles.searchPannel}>
                <h2>Find Players</h2>
                <br></br>
                <h3>Username</h3>
                <input type="text" id="username"></input>
                <h3>League Username</h3>
                <input type="text" id="leagueName"></input>
                <h3>Rank level?</h3>
                <select id="rank">
                    <option value="">None</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="diamond">Diamond</option>
                    <option value="master">Master</option>
                    <option value="challenger">Challenger</option>
                </select>
                <h3>Main Role</h3>
                <select id="role">
                    <option value="TOP">Top</option>
                    <option value="MID">Mid</option>
                    <option value="JUNGLE">Jungle</option>
                    <option value="ADC">ADC</option>
                    <option value="SUPPORT">Support</option>
                    <option value="">Fill</option>
                </select>
                <br></br>
                <button className={styles.searchButton} onClick={this.SearchPlayers}><h3>Search</h3></button>
            </div>
        )

    }

    render(){
        return (
            <div className={styles.bg}>
                {this.renderSearchPanel()}
                {this.renderPlayers(this.state.showPlayers)}
            </div>
        )
    }

    buildquery = (queries) => {
        let temp = ''
        let first = true
        console.log(queries)
        queries.forEach(item => {
            console.log(item.key)
            if (first){
                temp = temp.concat(`?${item.key}=${item.value}`)
                first = false
            } else {
                temp = temp.concat(`&${item.key}=${item.value}`)
            }
        })
        console.log(temp)
        return temp
    }

    SearchPlayers = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value
        const leagueName = document.getElementById("leagueName").value
        const rank_select = document.getElementById("rank");
        const role_select = document.getElementById("role");
        const rank = rank_select.options[rank_select.selectedIndex].value
        const role = role_select.options[role_select.selectedIndex].value
        let lower = 0
        let higher = 0
        if (rank === "bronze"){
            lower = 1
            higher = 5
        } else if (rank === "silver"){
            lower = 6
            higher = 10
        } else if (rank === "gold"){
            lower = 11
            higher = 15
        } else if (rank === "platinum"){
            lower = 16
            higher = 20
        } else if (rank === "diamond"){
            lower = 21
            higher = 25
        } else if (rank === "master"){
            lower = 26
            higher = 26
        } else if (rank === "challenger"){
            lower = 27
            higher = 27
        }
        let queries = []
        if (rank !==''){
            queries.push({key:"lowestRank", value: parseInt(lower)})
            queries.push({key:"highestRank", value: parseInt(higher)})
        }
        if (username !== ''){
            queries.push({key:"username", value: username})
        }
        if (leagueName !== ''){
            queries.push({key:"leagueUsername", value: leagueName})
        }
        if (role !== ''){
            queries.push({key:"mainRole", value: role})
        }
        axios.get(`${backendRootLink}/searchUsers${this.buildquery(queries)}`).then((result) => {
            this.setState({
                searched_players: result.data,
                showPlayers: true
            })
        })
    }
}

export default FindContainer;