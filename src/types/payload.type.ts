export interface IProductResponse {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    is_for_self_use: boolean;
}

export interface IRolePayload {
    name: string;
    description: string;
}

export interface IRoleResponse extends IRolePayload {
    id: string;
}

export interface IVisaTypePayload {
    name: string;
    description: string;
}

export interface IVisaTypeResponse extends IVisaTypePayload {
    id: string;
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

export interface IAddCompanyPayload {
    name: string;
    subdomain: string;
    email: string;
    address: string;
    state: string;
    city: string;
    postal_code: string;
    phone_number: string;
    contact_person: string;
    website: string;
    registration_type: string;
    registration_number: string;
    country_calling_code: string;
    country: string;
    logo: string;
    cover_image: string;
}

export interface IMyCompanyPayload {
    id: string;
    name: string;
    subdomain: string;
    status_id: string;
    email: string;
    logo: string;
    cover_image: string;
    products: IProductResponse[];
}
export interface IUserCompanyProductsResponse {
    companies: IMyCompanyPayload[];
    saas_core_products: IProductResponse[];
}

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

// SOCIAL_LINKS
export interface ISocialLinksPayload {
    title: string;
    link: string;
}

export interface ISocialLinksResponse extends ISocialLinksPayload {
    id: string;
}

// -----SOCIAL_LINKS-----ENDS-----

export interface ICurrencysResponse {
    name: string;
    code: string;
    symbol: string;
}

// VISITOR
// {
//   "registration_date": "2023-08-03",
//   "first_name": "string",
//   "last_name": "string",
//   "country": "string",
//   "state": "string",
//   "street_address": "string",
//   "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "phone_nos": [
//     "string"
//   ],
//   "visiting_purpose": "string",
//   "remarks": "string",
//   "information_channel": "string",
//   "email": [
//     "string"
//   ],
//   "going_to_foreign": true,
//   "visa_type_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "visiting_country": "string",
//   "visiting_country_state": "string",
//   "deal_amount": 0,
//   "applied_position": "string",
//   "expected_salary_pa": 0,
//   "expected_take_off_date": "2023-08-03"
// }

// "errors": {
//     "registration_date": [
//       "The registration date field is required."
//     ],
//     "first_name": [
//       "The first name field is required."
//     ],
//     "last_name": [
//       "The last name field is required."
//     ],
//     "country": [
//       "The country field is required."
//     ],
//     "state": [
//       "The state field is required."
//     ],
//     "visiting_purpose": [
//       "The visiting purpose field is required."
//     ],
//     "information_channel": [
//       "The information channel field is required."
//     ],
//     "going_to_foreign": [
//       "The going to foreign field is required."
//     ]
//   }
export interface IVisitorPayload {
    registration_date: Date;
    first_name: string;
    last_name: string;
    email: string[];
    mobile: string;
    country: string;
    state: string;
    street_address: string | null;
    profile_picture: string | null;
    postal_code: string | null;
    agent_id: string | null;
    phone_nos: string[] | null;
    visiting_purpose: string;
    remarks: string;
    information_channel: string;
    going_to_foreign: boolean;
    visa_type_id: string;
    visiting_country: string;
    visiting_country_state: string;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number;
    expected_take_off_date: Date;
}
