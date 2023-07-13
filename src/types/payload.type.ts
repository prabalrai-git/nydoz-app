export interface IProductResponse {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    is_for_self_use: boolean;
}

// {
//       "id": 0,
//       "name": "string",
//       "company_id": 0,
//       "description": "string"
//     }

export interface IRoleResponse {
    id: string;
    name: string;
    company_id: number;
    description: string;
}

export interface IRolePayload {
    name: string;
    description: string;
}

export interface IDocumentResponse {
    id: 0;
    title: string;
    file_link: string;
    uploaded_by: 0;
    is_restricted: true;
    visible_to?: string[];
}

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

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ICompanyResponse {
    id: string;
    name: string;
    subdomain: string;
    company_owner_id: string;
    status_id: string;
    email: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    country_calling_code: string;
    phone_number: string;
    contact_person: string;
    website: string;
    registration_type: string;
    registration_number: string;
    logo: string;
    cover_image: string;
}

// {
//   "first_name": "string",
//   "last_name": "string",
//   "email": "string",
//   "mobile": "string",
//   "country": "string",
//   "state": "string",
//   "city": "string",
//   "street_address": "string",
//   "profile_picture": "string",
//   "postal_code": "string"
// }

// Agent

export interface IAgentPayload {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    country: string;
    state: string;
    city: string;
    street_address: string;
    profile_picture: string;
    postal_code: string;
}

export interface IAgentResponse extends IAgentPayload {
    id: string;
}
