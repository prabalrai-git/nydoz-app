import * as yup from "yup";

export const companySchema = yup.object().shape({
    name: yup.string().required(),
    subdomain: yup
        .string()
        .matches(/^\S*$/, "Subdomain should not contain spaces")
        .required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    phone_number: yup.string().required(),
    contact_person: yup.string().required(),
    website: yup.string().url().required(),
    registration_type: yup.string().required(),
    registration_number: yup.string().required(),
});

export const companyRolesSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
});
