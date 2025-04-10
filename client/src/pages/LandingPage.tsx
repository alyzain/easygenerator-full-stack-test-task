import { JSX } from 'react';
import Header, { HeaderType } from '../components/Header';
import '../styles/pages/landingPage.css';
import Footer from '../components/Footer';

const LandingPage = (): JSX.Element => {
    return (
        <>
            <Header type={HeaderType.Landing} />
            <div className="landing-page">
                <div className="landing-content">
                    <h1>Welcome to the Full-Stack Authentication App</h1>
                    <p>Your journey to authentication starts here.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;