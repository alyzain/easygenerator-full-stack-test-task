import { JSX } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/header.css';

interface HeaderProps {
    type: 'sign-in' | 'sign-up';
}

const Header = (props: HeaderProps): JSX.Element => {
    const { type } = props;
    return (
        <nav className="header-nav">
            <img
                className="logo"
                src="https://assets.easygenerator.com/fragment/auth-page/2025.02.19.master-b30de583c5/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
                alt="Easygenerator Logo"
            />
            <section className="auth-switch">
                {type === 'sign-in' ? (
                    <>
                        <p>Don't have an account?</p>
                        <Link to="/signup">
                            <button className="btn light extra-large underline">Sign up</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <p>Already have an account?</p>
                        <Link to="/signin">
                            <button className="btn light extra-large underline">Log in</button>
                        </Link>
                    </>
                )}
            </section>
        </nav>
    );
};

export default Header;