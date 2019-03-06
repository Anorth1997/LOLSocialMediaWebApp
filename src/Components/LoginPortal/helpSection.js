import React from 'react';

import cx from 'classnames';

const HelpSection = (props) => {

    return (

        <div className={cx("container-fluid", props.helpSectionStyle.helpSection)}>

            <div className="row">
                <div className={cx("col-sm-6", "col-xs-12")}>
                    <p onClick={props.forgotUsername}>Forgot Username?</p>
                    <p onClick={props.forgotPassword}>Forgot Password?</p>
                </div>
                
                <div className={cx("col-sm-6", "col-xs-12", props.helpSectionStyle.right)}>
                    <p onClick={props.forgotEmail}>Forgot Email?</p>
                </div>
            </div>

        </div>
    );
};

export default HelpSection;