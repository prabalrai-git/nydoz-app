import * as yup from "yup";

const compantSchema = yup.object().shape({
    name: yup.string().required(),
    subdomain: yup.string().required(),
    owner_id: yup.number().required(),
    status_id: yup.number().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    country_calling_code: yup.string().required(),
    phone_number: yup.string().required(),
    contact_person: yup.string().required(),
    website: yup.string().url().required(),
    registration_type: yup.string().required(),
    registration_number: yup.string().required(),
    logo: yup.string().url().required(),
    cover_image: yup.string().url().required(),
});

export default compantSchema;
