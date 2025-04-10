import axios from 'axios';
import { SignInRequestInfo, SignInResponseInfo, SignUpRequestInfo, SignUpResponseInfo } from '../types/auth.types';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signUp = async (name: string, email: string, password: string): Promise<SignUpResponseInfo> => {
    const requestData: SignUpRequestInfo = { name, email, password };
    try {
        const response = await axiosClient.post<SignUpResponseInfo>('/auth/signup', requestData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const signIn = async (email: string, password: string): Promise<SignInResponseInfo> => {
    const requestData: SignInRequestInfo = { email, password };
    try {
        const response = await axiosClient.post<SignInResponseInfo>('/auth/signin', requestData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};