import React from 'react';

const CheckBox = (props) => {
    return (
        

        <div className={props.checkBoxStyling.checkBox}>
            {/* {console.log(props)} */}
            <span>
            <label>
                <input type="checkbox"/>{props.text}
            </label>
            </span>
        </div>
    );
};

export default CheckBox;