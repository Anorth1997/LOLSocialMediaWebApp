import React from 'react';

import styles from '../../scss-modules/main-landing-page/user_dashboard.module.scss';

const PatchNotes = () => {
    return (
        <div className={styles.patchNotesContainer}>
            <iframe 
                className={styles.patchNotesVideo}
                src="https://www.youtube.com/embed/7zhbIt7lL2g" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
    );
}

export default PatchNotes;
