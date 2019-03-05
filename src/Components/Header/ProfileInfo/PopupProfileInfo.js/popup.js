import React from 'react';

import styles from '../../../../scss-modules/header/popup.module.scss';

const PopupProfileInfo = (props) => {


    console.log(props);

    return (
        props.show ?
        <div className={styles.popupContainer}>
            Hello
        </div>: null
    );
};

export default PopupProfileInfo;