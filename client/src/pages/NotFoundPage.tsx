import { JSX } from 'react';
import Header, { HeaderType } from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/404Page.css';

const NotFoundPage = (): JSX.Element => {
    return (
        <>
            <Header type={HeaderType.Unknown} />
            <div className="not-found-page">
                <div className="not-found-content">
                    <h1>Oops! Page Not Found</h1>
                    <p>Looks like you've hit a dead end. Let's get you back on track!</p>
                    <a href="/" className="go-home">Go Back Home</a>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFoundPage;
