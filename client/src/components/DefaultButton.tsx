import { JSX } from 'react';
import '../styles/components/button.css';

interface ButtonProps {
    label: string;
    type?: "submit" | "button";
    styleClass?: string;
}

const Button = ({ label, type = "button", styleClass }: ButtonProps): JSX.Element => {
    return (
        <button className={`btn ${styleClass}`} type={type}>
            {label}
        </button>
    );
};

export default Button;