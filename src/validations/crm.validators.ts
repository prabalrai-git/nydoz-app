import * as yup from "yup";

export const enrollmentSchema = yup.object().shape({
    name: yup.string().required(),
    website: yup.string().required(),
    state: yup.string().required(),
    description: yup.string(),
});

export const visitorsSchema = yup.object().shape({
    registration_date: yup.date().required(),
    first_name: yup.string().required("First Name is required."),
    last_name: yup.string().required("Last Name is required."),
    state: yup.string().required("State is required."),
    street_address: yup.string().required("Address is required."),
    phone_nos: yup
        .array()
        .of(
            yup
                .string()
                .required(
                    "Atleast one phone number /mobile number is required."
                )
        ),
    visiting_purpose: yup.string().required("Visiting purpose is required."),
    remarks: yup.string(),
    email: yup
        .array()
        .of(
            yup
                .string()
                .email("Email must be a valid email.")
                .required("Atleast one email address is required.")
        ),
    going_to_foreign: yup.boolean(),
    information_channel: yup
        .string()
        .required("Information Channel is required."),
    deal_amount: yup.number().transform((value, originalValue) => {
        if (isNaN(originalValue) || originalValue === "") {
            return undefined;
        }
        return value;
    }),
    applied_position: yup.string(),
    expected_salary_pa: yup.number().transform((value, originalValue) => {
        if (isNaN(originalValue) || originalValue === "") {
            return undefined;
        }
        return value;
    }),
    expected_take_off_date: yup.date(),
});

// {
//   "message": "The registration date field is required. (and 7 more errors)",
//   "errors": {
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
// }

// {
//   "message": "The registration date field is required. (and 7 more errors)",
//   "errors": {
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
// }

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

export const agentSchema = yup.object().shape({
    first_name: yup.string().required("First Name field is required."),
    last_name: yup.string().required("Last Name field is required."),
    email: yup
        .string()
        .email("Email must be a valid email.")
        .required("Email field is required."),
    mobile: yup.string().required("Mobile field is required."),
    state: yup.string().required("State field is required."),
    city: yup.string().required("City field is required."),
    street_address: yup.string().required("Address field is required."),
    postal_code: yup.string().required("Postal Code field is required."),
});
