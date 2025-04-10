const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;

const passwordUpperCaseRegex = /[A-Z]/;
const passwordLowerCaseRegex = /[a-z]/;
const passwordNumberRegex = /\d/;
const passwordSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateSignUp = (name: string, email: string, password: string) => {
    let errors: { [key: string]: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
        errors.name = 'Name cannot be empty or whitespace';
    } else if (name.length < MIN_NAME_LENGTH) {
        errors.name = `Name must be at least ${MIN_NAME_LENGTH} characters long`;
    } else if (name.length > MAX_NAME_LENGTH) {
        errors.name = `Name must not exceed ${MAX_NAME_LENGTH} characters`;
    }

    if (!email) {
        errors.email = 'Email cannot be empty'
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please provide a valid email address';
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    } else if (password.length > MAX_PASSWORD_LENGTH) {
        errors.password = `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`;
    } else if (!passwordUpperCaseRegex.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!passwordLowerCaseRegex.test(password)) {
        errors.password = 'Password must contain at least one lowercase letter';
    } else if (!passwordNumberRegex.test(password)) {
        errors.password = 'Password must contain at least one number';
    } else if (!passwordSpecialCharRegex.test(password)) {
        errors.password = 'Password must contain at least one special character';
    }

    return errors;
};

export const validateSignIn = (email: string, password: string) => {
    const errors: { [key: string]: string } = {};

    if (!email) {
        errors.email = 'Email cannot be empty'
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please provide a valid email address';
    }

    if (!password) errors.password = 'Password cannot be empty';

    return errors;
};
