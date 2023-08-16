import * as yup from "yup";

export const enrollmentSchema = yup.object().shape({
    name: yup.string().required(),
    website: yup.string().required(),
    state: yup.string().required(),
    description: yup.string(),
});

export const visitorsNotGoingOutSchema = yup.object().shape({
    registration_date: yup.string().required(),
    first_name: yup.string().required("First Name is required."),
    last_name: yup.string().required("Last Name is required."),
    state: yup.string().required("State is required."),
    // country-from-component
    street_address: yup.string().required("Address is required."),
    remarks: yup.string(),
    phone_nos: yup
        .array()
        .of(
            yup
                .string()
                .required(
                    "Atleast one phone number /mobile number is required."
                )
        ),
    information_channel: yup.string().required("Visiting purpose is required."),
    email: yup
        .array()
        .of(
            yup
                .string()
                .email("Email must be a valid email.")
                .required("Atleast one email address is required.")
        ),
});
export const visitorsGoingOutSchema = yup.object().shape({
    registration_date: yup.string().required(),
    first_name: yup.string().required("First Name is required."),
    last_name: yup.string().required("Last Name is required."),
    state: yup.string().required("State is required."),
    // country-from-component
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
    information_channel: yup.string().required("Visiting purpose is required."),
    visiting_purpose: yup.string().required("Visiting purpose is required."),
    remarks: yup.string(),
    // information_channel-from-component
    email: yup
        .array()
        .of(
            yup
                .string()
                .email("Email must be a valid email.")
                .required("Atleast one email address is required.")
        ),

    // visiting-purpose-from-component
    deal_amount: yup.number().transform((value, originalValue) => {
        if (isNaN(originalValue) || originalValue === "") {
            return undefined;
        }
        return value;
    }),
    visiting_country_state: yup.string(),
    applied_position: yup.string(),
    expected_salary_pa: yup.number().transform((value, originalValue) => {
        if (isNaN(originalValue) || originalValue === "") {
            return undefined;
        }
        return value;
    }),
    expected_take_off_date: yup.string(),
});

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

export const enrollmentOpeningsSchema = yup.object().shape({
    enroll_start_date: yup.string().required(),
    enroll_end_date: yup.string().required(),
    position: yup.string().required(),
    total_opening: yup.number(),
    offered_salary: yup.number(),
    description: yup.string(),
});

export const informationChannelSchema = yup.object().shape({
    description: yup.string().required(),
});

export const clientSchema = yup.object().shape({
    registration_date: yup.date().required(),
    first_name: yup.string().required("First Name is required."),
    last_name: yup.string().required("Last Name is required."),
    // country-from-component
    state: yup.string(),
    street_address: yup.string(),
    phone_nos: yup.array().of(yup.string()),
    // visitor id from component
    remarks: yup.string(),

    email: yup.array().of(yup.string().email("Email must be a valid email.")),
    // visa_type_id-from-component
    // visiting_country-from-component
    deal_amount: yup
        .number()
        .transform((value, originalValue) => {
            if (isNaN(originalValue) || originalValue === "") {
                return undefined;
            }
            return value;
        })
        .required("Deal amount is required."),
    applied_position: yup.string().required("Applied position is required."),
    expected_salary_pa: yup
        .number()
        .transform((value, originalValue) => {
            if (isNaN(originalValue) || originalValue === "") {
                return undefined;
            }
            return value;
        })
        .required("Expected salary is required."),
    expected_take_off_date: yup
        .date()
        .required("Expected take off date is required."),
    // salary_currency_code-from-component
    //agent_id-from-component
    visiting_country_state: yup.string(),
    // enrollment_id-from-component
    // enrollment_opening_from-component
});
