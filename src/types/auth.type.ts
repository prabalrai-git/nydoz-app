import { IUserState } from "./payload.type";

export interface IUserRegisterResponse {
    id: string;
    first_name: string;
    last_name: string;
    mobile: string | undefined;
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

// {
//   "first_name": "string",
//   "last_name": "string",
//   "mobile": "string",
//   "email": "string",
//   "password": "string",
//   "password_confirmation": "string",
//   "secondary_email": "string",
//   "country_calling_code": "string",
//   "country": "string",
//   "state": "string",
//   "city": "string",
//   "street_address": "string",
//   "profile_picture": "string",
//   "postal_code": "string"
// }

export interface IUserRegisterPayload {
    first_name: string;
    last_name: string;
    mobile: string | undefined;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ILoginResponse {
    user: IUserState;
    token: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}
