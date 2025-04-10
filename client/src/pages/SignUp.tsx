import { JSX, useState } from 'react';
import InputField from '../components/InputField';
import '../styles/pages/signUp.css';
import '../styles/common/messages.css';
import DefaultButton from '../components/DefaultButton';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignUp = (): JSX.Element => {
    const { register } = useAuth();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            if (error) setError(null);
            if (successMessage) setSuccessMessage(null);
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register({name, email, password});
            setError(null);
            setSuccessMessage('Registration successful! Redirecting to Sign In...');
            setTimeout(() => {
                setSuccessMessage(null);
                navigate('/landingpage');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <div>
            <Header type="sign-up" />
            <div className="sign-up-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleInputChange(setName)}
                        aria-label="Name"
                    />
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                        aria-label="Email"
                    />
                    <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        aria-label="Password"
                    />
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <DefaultButton label="Sign Up" type="submit" styleClass="primary" />
                </form>
            </div>
        </div>
    );
};

export default SignUp;