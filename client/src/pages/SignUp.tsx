import { JSX, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import '../styles/pages/signUp.css';
import '../styles/common/messages.css';
import DefaultButton from '../components/DefaultButton';
import Header, { HeaderType } from '../components/Header';
import { validateSignUp } from '../utils/validate';
import Footer from '../components/Footer';

const SignUp = (): JSX.Element => {
    const { register } = useAuth();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const validationErrors = validateSignUp(name, email, password);
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
        const validationErrors = validateSignUp(name, email, password);
        setError((prevErrors) => ({ ...prevErrors, [field]: validationErrors[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register({ name, email, password });
            setError({});
            setSuccessMessage('Registration successful! Redirecting to Landing Page...');
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
            <Header type={HeaderType.SignUp} />
            <div className="sign-up-wrapper">
                <div className="sign-up-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="Name"
                            type="text"
                            value={name}
                            onChange={handleInputChange(setName)}
                            aria-label="Name"
                            onBlur={() => handleBlur('name')}
                            error={error.name}
                        />
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
                        {error && error.general && <div className="error-message">{error.general}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        <div className="action-button-container">
                            <DefaultButton label="Sign Up" disabled={!isFormValid} type="submit" styleClass="primary" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;