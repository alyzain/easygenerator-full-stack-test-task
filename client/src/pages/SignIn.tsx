import { JSX, useState } from 'react';
import InputField from '../components/InputField';
import '../styles/pages/signIn.css';
import DefaultButton from '../components/DefaultButton';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignIn = (): JSX.Element => {
    const { login } = useAuth();
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
            await login({email, password});
            setError(null);
            setSuccessMessage('Sign-in successful! Redirecting to the Landing Page...');
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
            <Header type="sign-in" />
            <div className="sign-in-container">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
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
                    <DefaultButton label="Sign In" type="submit" styleClass="secondary" />
                </form>
            </div>
        </div>
    );
};

export default SignIn;