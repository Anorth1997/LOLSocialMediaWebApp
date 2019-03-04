import React, { Component } from 'react';

import styles from '../scss-modules/find-container/find-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';
import CheckBox from '../widgets/Checkbox/checkbox';
import HelpSection from '../Components/LoginPortal/helpSection';


class FindContainer extends Component{

    render(){
        return (
            <div className={styles.bg}>
                <div className={styles.navBarContainer}>
                    <ul className={styles.navBar}>
                        <li><button className={styles.navButton}>Explore</button></li>
                        <li><button className={styles.navButton}>Find Others</button></li>
                        <li><button className={styles.navButton}>Tournaments</button></li>
                        <li><button className={styles.navButton}>Bookup Esports</button></li>
                        <li><button className={styles.navButton}>Name</button></li>
                    </ul>
                </div>
                <div className={styles.searchPannel}>
                    <h2>Find Players</h2>
                    <br></br>
                    <h3>How many?</h3>
                    <select>
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                    </select>
                    <h3>Rank level?</h3>
                    <select>
                        <option value="iron">Iron</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
                        <option value="diamond">Diamond</option>
                        <option value="master">Master</option>
                        <option value="grandmaster">Grandmaster</option>
                        <option value="challenger">Challenger</option>
                    </select>
                    <h3>Mics?</h3>
                    <select>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <br></br>
                    <button className={styles.searchButton} onClick={this.SearchPlayers}><h3>Search</h3></button>
                </div>
                <div className={styles.playerDisplayPannel} ref="xd">
                    <ul className={styles.playerBox}>
                        <li className={styles.playerIconContainer}>
                            <img className={styles.playerIcon} ></img>
                        </li>
                        <li className={styles.playerNameSection}>
                            <p>Jim</p>
                            <p>xXLissxX</p>
                        </li>
                        <li className={styles.inviteSection}>
                            <button className={styles.inviteButton}>Invite</button>
                            <p>Rank: PlatinumVI</p>
                        </li>
                    </ul>
                    <ul className={styles.playerBox}>
                        <li className={styles.playerIconContainer}>
                            <img className={styles.playerIcon} ></img>
                        </li>
                        <li className={styles.playerNameSection}>
                            <p >Lisa</p>
                            <p>Hearts_XO</p>
                        </li>
                        <li className={styles.inviteSection}>
                            <button className={styles.inviteButton}>Invite</button>
                            <p>Rank: PlatinumV</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.eventBarContainer}>
                    <ul className={styles.eventBar}>
                        <li><a>something</a></li>
                        <li><a>something</a></li>
                    </ul>
                </div>







            </div>
        )
    }

    // SearchPlayers = (event) => {
    //     event.preventDefault();

    //     const pdp = document.querySelector('.playerDisplayPannel')
    //     console.log(pdp)
    //     pdp.style.display = false;
    // }
}

export default FindContainer;