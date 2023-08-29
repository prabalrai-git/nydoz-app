// {
//   "first_name": "string",
//   "last_name": "string",
//   "mobile": "string",
//   "email": "string",
//   "password": "string",
//   "password_confirmation": "string"
// }

export interface IUsersOfCompanyPayload {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IUsersOfCompanyResponse {
    id: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    password: string;
    password_confirmation: string;
}
