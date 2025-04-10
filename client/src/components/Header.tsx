import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/header.css';

export enum HeaderType {
    SignIn = 'sign-in',
    SignUp = 'sign-up',
    Landing = 'landing',
    Unknown = 'unknown'
}

interface HeaderProps {
    type: HeaderType;
}

const Header = (props: HeaderProps): JSX.Element => {
    const { type } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signin');
    };

    const renderAuthSwitch = () => {
        if (type === HeaderType.Landing) {
            return (
                <section className="auth-switch">
                    <button className="btn light logout-btn" onClick={handleLogout}>
                        Log Out
                    </button>
                </section>
            );
        }
        if (type === HeaderType.SignIn) {
            return (
                <section className="auth-switch">
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                        <button className="btn light extra-large underline">Sign up</button>
                    </Link>
                </section>
            );
        }
        if (type === HeaderType.Unknown) {
            return <></>
        }
        return (
            <section className="auth-switch">
                <p>Already have an account?</p>
                <Link to="/signin">
                    <button className="btn light extra-large underline">Log in</button>
                </Link>
            </section>
        );
    };

    return (
        <nav className="header-nav">
            <img
                className="logo"
                src="https://assets.easygenerator.com/fragment/auth-page/2025.02.19.master-b30de583c5/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
                alt="Easygenerator Logo"
            />
            {renderAuthSwitch()}
        </nav>
    );
};

export default Header;