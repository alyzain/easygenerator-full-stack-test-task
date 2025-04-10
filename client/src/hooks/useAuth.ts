import { signIn, signUp } from '../services/auth.service';
import { SignInRequestInfo, SignInResponseInfo, SignUpRequestInfo, SignUpResponseInfo } from '../types/auth.types';

export const useAuth = () => {
    const register = async ({ name, email, password }: SignUpRequestInfo): Promise<void> => {
        try {
            const result: SignUpResponseInfo = await signUp(name, email, password);
            localStorage.setItem('authToken', result.data.accessToken);

        } catch (error: any) {
            throw error;
        }
    };

    const login = async ({ email, password }: SignInRequestInfo): Promise<void> => {
        try {
            const result: SignInResponseInfo = await signIn(email, password);
            localStorage.setItem('authToken', result.data.accessToken);

        } catch (error: any) {
            throw error;
        }
    };

    return {
        login,
        register
    };
};
