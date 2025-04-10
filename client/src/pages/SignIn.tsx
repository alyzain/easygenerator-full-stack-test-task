import { JSX, useEffect, useState } from 'react';
import InputField from '../components/InputField';
import '../styles/pages/signIn.css';
import DefaultButton from '../components/DefaultButton';
import Header, { HeaderType } from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { validateSignIn } from '../utils/validate';
import Footer from '../components/Footer';

const SignIn = (): JSX.Element => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const validationErrors = validateSignIn(email, password);
        setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [name, email, password, error]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);

            setError((prevErrors) => ({
                ...prevErrors,
                [e.target.name]: '',
                general: ''
            }));
        };
    };

    const handleBlur = (field: string) => {
        const validationErrors = validateSignIn(email, password);
        setError((prevErrors) => ({ ...prevErrors, [field]: validationErrors[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login({ email, password });
            setError({});
            setSuccessMessage('Sign-in successful! Redirecting to the Landing Page...');
            setTimeout(() => {
                setSuccessMessage(null);
                navigate('/landingpage');
            }, 2000);
        } catch (err: any) {
            setError({ general: err.response?.data?.message || 'An unexpected error occurred' });
        }
    };

    return (
        <div>
            <Header type={HeaderType.SignIn} />
            <div className="sign-up-wrapper">
                <div className="sign-in-container">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            aria-label="Email"
                            onBlur={() => handleBlur('email')}
                            error={error.email}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            aria-label="Password"
                            onBlur={() => handleBlur('password')}
                            error={error.password}
                        />
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        {error && error.general && <div className="error-message">{error.general}</div>}
                        <div className="action-button-container">
                            <DefaultButton label="Sign In" disabled={!isFormValid} type="submit" styleClass="secondary" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;