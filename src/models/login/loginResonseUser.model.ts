import { LoginResponseProviderData } from "./loginResonseProviderData.model";
import { LoginResponseStsTokenManager } from "./loginResonseStsTokenManager.model";
import { LoginResponseMultiFactor } from "./loginResonseMultiFactor.model";

export class LoginResponseUser {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    isAnonymous: boolean;
    tenantId: string;
    providerData: LoginResponseProviderData;
    apiKey: string;
    appName: string;
    authDomain: string;
    stsTokenManager: LoginResponseStsTokenManager;
    redirectEventId: string;
    lastLoginAt: string;
    createdAt: string;
    multiFactor: LoginResponseMultiFactor;
}