import { JSX } from 'react';
import '../styles/components/inputField.css';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    error?: string;
    placeholder?: string;
}

const InputField = ({ label, type, value, onChange, onBlur, error, placeholder }: InputFieldProps): JSX.Element => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input
                id={label}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`input-field ${error ? 'input-error' : ''}`}
                placeholder={placeholder}
                aria-invalid={error ? 'true' : 'false'}
            />
            {error && <div className="error-input-message">{error}</div>}
        </div>
    );
};

export default InputField;