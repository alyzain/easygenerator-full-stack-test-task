import { JSX } from 'react';
import '../styles/components/button.css';

interface ButtonProps {
    label: string;
    disabled: boolean;
    type?: "submit" | "button";
    styleClass?: string;
}

const Button = ({ label, disabled, type = "button", styleClass }: ButtonProps): JSX.Element => {
    return (
        <button className={`btn ${styleClass}`} disabled={disabled} type={type}>
            {label}
        </button>
    );
};

export default Button;