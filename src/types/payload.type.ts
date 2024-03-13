export interface IProductResponse {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  is_for_self_use: boolean;
}

export interface IRolePayload {
  name: string;
  description: string;
}

export interface IRoleResponse extends IRolePayload {
  id: string;
}

export interface IVisaTypePayload {
  name: string;
  description: string;
}

export interface IVisaTypeResponse extends IVisaTypePayload {
  id: string;
}

export interface IDocumentResponse {
  id: 0;
  title: string;
  file_link: string;
  uploaded_by: 0;
  is_restricted: true;
  visible_to?: string[];
}

export interface IUserResponseResponse {
  id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  status: string | null;
  status_id: number;
  secondary_email: string;
  country_calling_code: string;
  country: string;
  state: string;
  city: string;
  street_address: string;
  profile_picture: string;
  postal_code: string;
}

export interface IUserState {
  id: string | null;
  email: string;
  email_verified_at: unknown;
  first_name: string;
  last_name: string;
  mobile: string;
  mobile_verified_at: unknown;
  isAdmin: boolean;
  permissions: string[];
}

export interface ICompanyResponse {
  id: string;
  name: string;
  subdomain: string;
  company_owner_id: string;
  status_id: string;
  email: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  country_calling_code: string;
  phone_number: string;
  contact_person: string;
  website: string;
  registration_type: string;
  registration_number: string;
  logo: string;
  cover_image: string;
}

export interface IAddCompanyPayload {
  name: string;
  subdomain: string;
  email: string;
  address: string;
  state: string;
  city: string;
  postal_code: string;
  phone_number: string;
  contact_person: string;
  website: string;
  registration_type: string;
  registration_number: string;
  country_calling_code: string;
  country: string;
  logo: string;
  cover_image: string;
}

export interface IMyCompanyPayload {
  id: string;
  name: string;
  subdomain: string;
  status_id: string;
  email: string;
  logo: string;
  cover_image: string;
  products: IProductResponse[];
}
export interface IUserCompanyProductsResponse {
  companies: IMyCompanyPayload[];
  saas_core_products: IProductResponse[];
}

// Agent

// SOCIAL_LINKS
export interface ISocialLinksPayload {
  title: string;
  link: string;
}

export interface ISocialLinksResponse extends ISocialLinksPayload {
  id: string;
}

// -----SOCIAL_LINKS-----ENDS-----

export interface ICurrencysResponse {
  name: string;
  code: string;
  symbol: string;
}

export interface ICustomFields {
  name: string;
  type: string;
  options: string;
  is_required: boolean;
  multiple_value: boolean;
}

export interface ITransactionTypeFields {
  name: string;
  description: string;
  transaction_effect: string;
}

export interface IFinancialAccountFields {
  institute_name: string;
  institute_site: string;
  account_name: string;
  account_number: string;
  swift_code: string;
  branch_name: string;
  branch_address: string;
  payment_method_ids: string[];
}

export interface IDynamicForm {
  id: string;
  name: string;
  is_account_required: boolean;
  custom_fields: ICustomFields[];
}

// company Status

// {
//   "title": "string",
//   "code": "string",
//   "background_color_class": "string",
//   "text_color_class": "string",
//   "action_api_url": "string",
//   "group_code": "string",
//   "is_group_default": true
// }

export interface IStatusPayload {
  title: string;
  code: string;
  background_color_class?: string;
  text_color_class?: string;
  action_api_url?: string;
  group_code: string;
  is_group_default?: boolean;
}

export interface IStatusResponse extends IStatusPayload {
  id: string;
}
