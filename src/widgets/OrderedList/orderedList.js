import React from 'react';

// import styles from '../../scss-modules/components/widgets/messageBox.module.scss';
import styles from '../../scss-modules/footer/messageBox.module.scss';


const OrderedList = (props) => {

    console.log('rendering ordered list');

    const template = props.messages.map((item, i) => {

        return (
            <div key={i} className={styles.message}
                
                style={{
                    alignSelf: item.fromUser === props.userId ? 'flex-end' : 'flex-start'        
                }}>
                {item.message}
            </div>
        )
    })


    return (
        <div className={styles.messageContainer}>
            {template}
        </div>
    );
};


export default OrderedList;
