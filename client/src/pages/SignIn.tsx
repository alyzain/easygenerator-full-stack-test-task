import { JSX } from 'react';
import InputField from '../components/InputField';
import '../styles/pages/signIn.css';
import DefaultButton from '../components/DefaultButton';
import Header from '../components/Header';

const SignIn = (): JSX.Element => {
    return (
        <div>
            <Header type="sign-in" />
            <div className="sign-in-container">
                <h2>Sign In</h2>
                <form>
                    <InputField label="Email" type="email" />
                    <InputField label="Password" type="password" />
                    <DefaultButton label='Sign In' type="submit" onClick={() => {}} styleClass="secondary" />
                </form>
            </div>
        </div>
    );
};

export default SignIn;