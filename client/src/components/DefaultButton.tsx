import { JSX } from 'react';
import '../styles/components/button.css';

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "submit" | "button";
    styleClass?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
    const { label, onClick, type, styleClass } = props;
    return (
        <button className={`btn ${styleClass}`} onClick={onClick} type={type}>
            {label}
        </button>
    );
};

export default Button;