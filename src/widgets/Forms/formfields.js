import React from 'react';

// import styles from '';


const FormFields = (props) => {

    const renderFields = () => {

        const formArray = [];

        for (let elementName in props.formData) {
            formArray.push({
                id: elementName,
                settings: props.formData[elementName]
            })
        }

        return formArray.map( (item, i) => {
            return (
                <div key={i}
                     style={{
                         marginBottom: '40px'
                     }}>
                    {props.submitted ? '' : ''}
                    {renderTemplates(item)}
                </div>
            );
        });
    }

    const showLabel = (show, label) => {
        return show ?  
            <label className={props.styles.formLabel}>{label}</label>
        : null;
    }

    const changeHandler = (event, id, blur) => {
        
        const newState = props.formData;

        newState[id].value = event.target.value;

        if (blur) {
            if (newState[id].element === 'input') {
                let validData = validate(newState[id]);
                newState[id].valid = validData[0];
                newState[id].validationMessage = validData[1];
            }
        }
        newState[id].touched = blur;
        
        props.change(newState);
    }

    const validate = (element) => {

        let error = [true, '']

        if (element.validation.minLength)  {
            const valid = element.value.length >= element.validation.minLength;
            const message = `${!valid ? 'Must be greater than ' + element.validation.minLength : ''}`;
            
            error = !valid ? [valid, message]: error; 
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;

            error = !valid ? [valid, message]: error;
        }

        console.log(error)

        return error;
    }

    const showValidation = (data) => {

        let errorMessage = null;

        if (data.validation.required && !data.valid) {
            errorMessage = (
                <div className={props.styles.errorLabel}>
                    {data.validationMessage}
                </div>
            );
        }
        return errorMessage;
    }

    const renderTemplates = (data) => {
        let formTemplate = null;
        let values = data.settings;

        switch(values.element) {
            case "input":
                formTemplate = (
                    <div>
                        { showLabel(values.label, values.labelText) }
                        <input 
                            // This will take all of the values in the config object and automatically use them
                            // for example, it will do this for name:
                            // type={values.config.type}
                            // placeholder={values.config.placeholder}
                            // etc
                            {...values.config}
                            value={values.value}
                            onBlur={
                                (event) => changeHandler(event, data.id, false)
                            }
                            onChange={
                                (event) => changeHandler(event, data.id, false)
                            }
                            className={props.styles.inputField}
                        />
                        {showValidation(values)}
                    </div>
                );
                break;
            // template for textarea
            case "textarea":

                break;
            // template for select
            case "select":

                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }

    return (

        

        <div>
            {/* {console.log(props)} */}
            {renderFields()}
        </div>
    );
}

export default FormFields;