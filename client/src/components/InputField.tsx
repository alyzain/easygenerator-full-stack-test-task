import { JSX } from 'react';
import '../styles/components/inputField.css';

interface InputFieldProps {
    label: string;
    type: string;
}

const InputField = (props: InputFieldProps): JSX.Element => {
    const { label, type } = props;
    return (
        <div className="input-container">
            <label>{label}</label>
            <input type={type} className="input-field" />
        </div>
    );
};

export default InputField;