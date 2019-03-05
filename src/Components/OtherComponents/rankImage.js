import React from 'react';

import styles from '../../scss-modules/others/rankImageStyling.module.scss';

const RankImage = (props) => {

    console.log(props);

    let rank = '';
    let value = 0;
    let romanNumeral = '';

    if (props.rank <= 5) {
        rank = 'bronze';
        value = props.rank;
    } else if (props.rank <= 10) {
        rank = 'silver';
        value = props.rank - 5;
    } else if (props.rank <= 15) {
        rank = 'gold';
        value = props.rank - 10;
    } else if (props.rank <= 20) {
        rank = 'platinum';
        value = props.rank - 15;
    } else if (props.rank <= 25) {
        rank = 'diamond';
        value = props.rank - 20;
    } else if (props.rank <= 30) {
        rank = 'master';
        value = props.rank - 25;
    } else {
        rank = "challenger"
        value = props.rank - 30;
    }

    switch(value) {
        case 1: 
            romanNumeral = 'I';
            break;
        case 2:
            romanNumeral = 'II';
            break;
        case 3:
            romanNumeral = 'III';
            break;
        case 4:
            romanNumeral = 'VI';
            break;
        default: 
            romanNumeral = 'V';
    }


    return (
        <div className={styles.rankDiv}>
            <span>
                <img src={require(`../../assets/images/ranks/${rank}.png`)} alt=""/>
                {props.showInfo ? <span>{`${rank.toUpperCase()} ${romanNumeral}`}</span> : null}
            </span>
            
        </div>
    );
};

export default RankImage;