// CRM

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

// {
//   "registration_date": "2023-08-02",
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
//   "expected_take_off_date": "2023-08-02"
// }

export interface IVisitorPayload {
    registration_date: Date;
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
    expected_take_off_date: Date | undefined;
    visiting_country: string;
}

export interface IVisitorResponse extends IVisitorPayload {
    id: string;
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

export interface InformationChannelPayload {
    description: string;
}
export interface InformationChannelResponse extends InformationChannelPayload {
    id: string;
}

export interface IVisitingPurposePayload {
    description: string;
}
export interface IVisitingPurposeResponse extends IVisitingPurposePayload {
    id: string;
}
