export interface UserResponseInfo {
    email: string;
    name: string;
}

export interface BaseResponseInfo {
    statusCode: number;
    message: string;
}

export interface AuthResponseInfo<T> extends BaseResponseInfo {
    data: T;
}

export interface SignUpRequestInfo {
    name: string;
    email: string;
    password: string;
}

export interface SignInRequestInfo {
    email: string;
    password: string;
}

export interface AuthDataResponse {
    user: UserResponseInfo;
    accessToken: string;
}

export type SignUpResponseInfo = AuthResponseInfo<AuthDataResponse>;
export type SignInResponseInfo = AuthResponseInfo<AuthDataResponse>;