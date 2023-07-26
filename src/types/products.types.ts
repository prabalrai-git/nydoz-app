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
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    street_address: string;
    phone_nos: string[];
    visiting_purpose: string;
    remarks: string;
    email: string[];
    going_to_foreign: boolean;
    visa_type_id: string;
    information_channel: string;
    visiting_country_state: string;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number;
    expected_take_off_date: string;
}

export interface IVisitorResponse extends IVisitorPayload {
    id: string;
}
