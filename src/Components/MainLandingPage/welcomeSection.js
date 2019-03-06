import React from 'react';

import styles from '../../scss-modules/main-landing-page/main_landing_page.module.scss';

import { Link } from 'react-router-dom';

const WelcomeSection = (props) => {

    // console.log(props);

    return (
        <div className={styles.welcomeSection}>

            <h1 className={styles.welcomingHeader}>Join our community with thousands of players and find other players or join tournaments with your friends!</h1>
            <iframe 
                className={styles.welcomeVideo}
                src="https://www.youtube.com/embed/SdidA-9GvgE" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>

            <h1 className={styles.signUpHeader}>Sign up with a free account today and connect with others!</h1>

            <Link to="/login" className={styles.loginButton}>
                Log in
            </Link>

        </div>
    );
}

export default WelcomeSection;
