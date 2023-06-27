export interface IUserResponseResponse {
    id: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    status: string | null;
    status_id: number;
    secondary_email: string;
    country_calling_code: string;
    country: string;
    state: string;
    city: string;
    street_address: string;
    profile_picture: string;
    postal_code: string;
}

export interface IUserState {
    id: string | null;
    email: string;
    email_verified_at: unknown;
    first_name: string;
    last_name: string;
    mobile: string;
    mobile_verified_at: unknown;
    isAdmin: boolean;
    permissions: string[];
}

export interface ILoginResponse {
    user: IUserState;
    token: string;
}
