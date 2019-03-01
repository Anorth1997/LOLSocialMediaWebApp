import React from 'react';

import styles from '../../scss-modules/errors/errors.module.scss';

const ErrorMessage = (props) => {
    return (
        <div className={styles.errorMessage}
             style={{
                 padding: props.show ? '5px' : '0px'
             }}>
            {props.show ? props.message : null}
        </div>
    );
}

export default ErrorMessage;