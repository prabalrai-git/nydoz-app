// {
//   "name": "string",
//   "subdomain": "string",
//   "owner_id": 0,
//   "status_id": 0,
//   "email": "string",
//   "address": "string",
//   "country": "string",
//   "state": "string",
//   "city": "string",
//   "postal_code": "string",
//   "country_calling_code": "string",
//   "phone_number": "string",
//   "contact_person": "string",
//   "website": "string",
//   "registration_type": "string",
//   "registration_number": "string",
//   "logo": "string",
//   "cover_image": "string"
// }

import Heading from "../../shared/molecules/Heading";

const AddCompany = () => {
    return (
        <div>
            <Heading text='Add Company' btnText='Add Company' showBtn={true} />
        </div>
    );
};

export default AddCompany;
