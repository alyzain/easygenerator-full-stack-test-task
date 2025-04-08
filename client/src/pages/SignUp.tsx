import { JSX } from 'react';
import InputField from '../components/InputField';
import '../styles/pages/signUp.css';
import DefaultButton from '../components/DefaultButton';
import Header from '../components/Header';

const SignUp = (): JSX.Element => {
    return (
        <div>
            <Header type="sign-up" />
            <div className="sign-up-container">
                <h2>Sign Up</h2>
                <form>
                    <InputField label="Email" type="email" />
                    <InputField label="Password" type="password" />
                    <DefaultButton label='Sign Up' type="submit" onClick={() => {}} styleClass="primary" />
                </form>
            </div>
        </div>
    );
};

export default SignUp;