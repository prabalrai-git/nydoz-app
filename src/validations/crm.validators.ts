import * as yup from "yup";

export const enrollmentSchema = yup.object().shape({
    name: yup.string().required(),
    website: yup.string().required(),
    state: yup.string().required(),
    description: yup.string(),
});

// {
//   "first_name": "string",
//   "last_name": "string",
//   "country": "string",
//   "state": "string",
//   "street_address": "string",
//   "phone_nos": [
//     "string"
//   ],
//   "visiting_purpose": "string",
//   "remarks": "string",
//   "email": [
//     "string"
//   ],
//   "going_to_foreign": true,
//   "visa_type_id": 0,
//   "information_channel": "string",
//   "visiting_country_state": "string",
//   "deal_amount": 0,
//   "applied_position": "string",
//   "expected_salary_pa": 0,
//   "expected_take_off_date": "string"
// }

export const visitorsSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    state: yup.string().required(),
    street_address: yup.string().required(),
    phone_nos: yup.array().of(yup.string().required()),
    visiting_purpose: yup.string().required(),
    remarks: yup.string(),
    email: yup.array().of(yup.string().required()),
    going_to_foreign: yup.boolean().required(),
    information_channel: yup.string().required(),
    visiting_country_state: yup.string().required(),
    deal_amount: yup.number().required(),
    applied_position: yup.string().required(),
    expected_salary_pa: yup.number(),
    expected_take_off_date: yup.string(),
});
