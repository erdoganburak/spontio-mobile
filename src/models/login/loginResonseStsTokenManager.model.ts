export default interface LoginResponseStsTokenManager {
    apiKey: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: string;
}