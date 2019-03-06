import React from 'react';

import styles from '../../scss-modules/main-landing-page/main_landing_page.module.scss';

const WelcomeSection = (props) => {

    // console.log(props);

    return (
        <div className={styles.welcomeSection}>

            <h1 className={styles.welcomingHeader}>Join our community with thousands of players and find other players or join tournaments with your friends!</h1>
        </div>
    );
}

export default WelcomeSection;
