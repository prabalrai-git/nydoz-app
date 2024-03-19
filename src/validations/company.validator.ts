import * as yup from "yup";

export const companySchema = yup.object().shape({
  name: yup.string().required("Company Name is required."),
  subdomain: yup
    .string()
    .matches(/^\S*$/, "Subdomain should not contain spaces.")
    .required("Subdomain is required."),
  email: yup
    .string()
    .email("Email must be a valid Email.")
    .required("Email is required."),
  address: yup.string().required("Address is required."),
  state: yup.string().required("State is required."),
  city: yup.string().required("City is required."),
  postal_code: yup
    .string()
    .matches(/^\S*$/, "Postal Code should not contain spaces.")
    .required(),
  phone_number: yup.string().required("Phone Number is required."),
  contact_person: yup.string().required("Contact Person's name is required."),
  website: yup.string().url().required("Website name is required."),
  registration_type: yup
    .string()
    .required("Registration Type is required. VAT, TIN, etc."),
  registration_number: yup
    .string()
    .required("Registration Number is required."),
});

export const companyRolesSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const VisaTypeSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const agentSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup
    .string()
    .required()
    .max(15, "Mobile Number field must not be greater than 15 characters."),
  state: yup.string().required(),
  city: yup.string().required(),
  street_address: yup.string().required(),
  postal_code: yup
    .string()
    .matches(/^\S*$/, "Postal Code should not contain spaces")
    .max(10, "The postal code field must not be greater than 10 characters.")
    .required(),
});

// CompanySocialLinks Schema

export const CompanySocialLinkSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .strict(true)
    .matches(
      /^\S+$/,
      "Title should not contain spaces.Eg:- Facebook.com, Twitter, etc"
    ),
  link: yup
    .string()
    .required("Link is required")
    .url("Invalid URL format. URL should be like:-  https://www.example.com"),
});

// Add user to Company Schema

export const userToCompanySchema = yup.object().shape({
  first_name: yup.string().required("First Name is required."),
  last_name: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
  mobile: yup.string().required("Mobile Number is required."),
  password: yup.string().required("Password is required."),
  password_confirmation: yup
    .string()
    .required("Password confirmation is required.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// {
//   "message": "The title field is required. (and 2 more errors)",
//   "errors": {
//     "title": [
//       "The title field is required."
//     ],
//     "code": [
//       "The code field is required."
//     ],
//     "group_code": [
//       "The group code field is required."
//     ]
//   }
// }

// {
//   "title": "string",
//   "code": "string",
//   "background_color_class": "string",
//   "text_color_class": "string",
//   "action_api_url": "string",
//   "group_code": "string",
//   "is_group_default": true
// }

export const statusSchema = yup.object().shape({
  title: yup.string().required("Title is required."),
  code: yup.string().required("Code is required."),
  background_color_class: yup
    .string()
    .required("background color is required."),
  text_color_class: yup.string().required("text color is required."),
  action_api_url: yup.string().required("action api is required."),
  group_code: yup.string().required("Group Code is required."),
  is_group_default: yup.boolean().required("group default is required."),
});
