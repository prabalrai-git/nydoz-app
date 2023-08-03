// CRM
import { IVisaTypeResponse } from "./payload.type";

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
export interface IEnrollmentPayload {
    name: string;
    website: string;
    logo: string;
    country: string;
    state: string;
    description: string;
}

export interface IEnrollmentResponse extends IEnrollmentPayload {
    id: string;
}

export interface IVisitorPayload {
    registration_date: string;
    information_channel: string;
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    visiting_purpose: string;
    visa_type_id: string | undefined;
    street_address: string;
    phone_nos: string[];
    remarks: string | undefined;
    email: string[];
    going_to_foreign: boolean;
    visiting_country_state: string | undefined;
    deal_amount: number | undefined;
    applied_position: string | undefined;
    expected_salary_pa: number | undefined;
    expected_take_off_date: string | undefined;
    visiting_country: string;
    agent_id: string | undefined;
}

export interface IVisitorResponse {
    registration_date: string;
    information_channel: InformationChannelResponse;
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    agent_id: IAgentResponse | undefined;
    visiting_purpose: IVisitingPurposeResponse;
    visa_type_id: IVisaTypeResponse | undefined;
    street_address: string;
    phone_nos: string[];
    remarks: string | undefined;
    email: string[];
    going_to_foreign: boolean;
    visiting_country_state: string | undefined;
    deal_amount: number | undefined;
    applied_position: string | undefined;
    expected_salary_pa: number | undefined;
    expected_take_off_date: string | undefined;
    visiting_country: string;
}

export interface IEnrollmentOpeningsPayload {
    institute_id: string;
    enroll_start_date: Date;
    enroll_end_date: Date;
    position: string;
    total_opening: number;
    visa_type_id: string;
    currency: string;
    offered_salary: number;
    description: string;
}

export interface IEnrollmentOpeningsResponse
    extends IEnrollmentOpeningsPayload {
    id: string;
}

export interface IVisitingPurposePayload {
    description: string;
}
export interface IVisitingPurposeResponse extends IVisitingPurposePayload {
    id: string;
}

export interface InformationChannelPayload {
    description: string;
}
export interface InformationChannelResponse extends InformationChannelPayload {
    id: string;
}

// {
//   "registration_date": "2023-08-03",
//   "first_name": "string",
//   "last_name": "string",
//   "country": "string",
//   "state": "string",
//   "street_address": "string",
//   "phone_nos": [
//     "string"
//   ],
//   "visitor_id": "string",
//   "remarks": "string",
//   "email": [
//     "user@example.com"
//   ],
//   "visa_type_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "visiting_country": "string",
//   "deal_amount": 0,
//   "applied_position": "string",
//   "expected_salary_pa": 0,
//   "expected_take_off_date": "2023-08-03",
//   "salary_currency_code": "string",
//   "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "visiting_country_state": "string",
//   "enrollment_institute_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "enrollment_opening_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// }

export interface IClientPayload {
    registration_date: string;
    first_name: string;
    last_name: string;
    phone_nos: string[];
    email: string[];
    visitor_id: string | null;
    remarks: string;
    street_address: string | null;
    state: string;
    country: string;
    profile_picture: string | null;
    postal_code: string | null;
    agent_id: string | null;
    visiting_purpose: string;
    information_channel: string;
    going_to_foreign: boolean;
    visa_type_id: string | null;
    visiting_country: string;
    visiting_country_state: string;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number;
    salary_currency_code: string;
    expected_take_off_date: string;
    enrollment_institute_id: string;
    enrollment_opening_id: string;
}
export interface IClientResponse {
    id: string;
    registration_date: string;
    first_name: string;
    last_name: string;
    phone_nos: string[];
    email: string[];
    visitor_id: IVisitorResponse | null;
    remarks: string;
    street_address: string | null;
    state: string;
    country: string;
    profile_picture: string | null;
    postal_code: string | null;
    agent_id: IAgentResponse | null;
    visiting_purpose: string;
    information_channel: InformationChannelResponse;
    going_to_foreign: boolean;
    visa_type_id: IVisaTypeResponse | undefined;
    visiting_country: string;
    visiting_country_state: string;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number;
    salary_currency_code: string;
    expected_take_off_date: string;
    enrollment_institute_id: IEnrollmentResponse;
    enrollment_opening_id: IEnrollmentOpeningsResponse;
}
