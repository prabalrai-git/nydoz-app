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

export interface IVisitorPayload {
    registration_date: string;
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    information_channel: string;
    visiting_purpose: string;
    visa_type_id: string;
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
}

export interface IVisitorResponse extends IVisitorPayload {
    id: string;
}

// {
//   "first_name": ,
//   "last_name": ,
//   "email": "string@gmail.com",
//   "mobile": ,
//   "country": ,
//   "state": ,
//   "city": ,
//   "street_address": ,
//   "profile_picture": ,
//   "postal_code":
// }
