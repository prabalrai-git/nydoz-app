import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import CountryCode from "../../../shared/atoms/CountryCode";

import {
  visitorsNotGoingOutSchema,
  visitorsGoingOutSchema,
} from "../../../../validations/crm.validators";
import { ISelectProps } from "../../../../types/react-select.type";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IVisitorPayload,
  IVisitorResponse,
  IVisitorPayloadNoForeign,
} from "../../../../types/products.types";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { XCircle } from "react-bootstrap-icons";
import { IVisaTypeResponse } from "../../../../types/payload.type";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
// import ServerSelect from "../../../shared/components/ServerSelect";

import {
  InformationChannelResponse,
  IVisitingPurposeResponse,
  IAgentResponse,
} from "../../../../types/products.types";

interface IFormData {
  registration_date: string;
  first_name: string;
  last_name: string;
  state: string;
  street_address: string;
  phone_nos: string[];
  email: string[];
  information_channel: string;
  visiting_purpose: string;
  remarks: string | undefined;
  deal_amount: number | undefined;
  applied_position: string | undefined;
  expected_salary_pa: number | undefined;
  expected_take_off_date: string | undefined;
  visiting_country_state: string | undefined;
}

const AddVisitor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goingForeign, setGoingForeign] = useState(false);
  const [selectInformationChannel, setSelectInformationChannel] = useState<
    InformationChannelResponse | undefined
  >();
  const [selectCommonVisitingPurpose, setSelectCommonVisitingPurpose] =
    useState<IVisitingPurposeResponse | undefined>();

  const [selectedVisaType, setSelectedVisaType] = useState<
    IVisaTypeResponse | undefined
  >();
  // const [selectedVisaTypeText, setSelectedVisaTypeText] =
  //     useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<
    IAgentResponse | undefined
  >();
  const [selectedCountry, setSelectedCountry] = useState<
    ISelectProps | undefined
  >(undefined);
  const [selectedVisitingCountry, setSelectedVisitingCountry] = useState<
    ISelectProps | undefined
  >(undefined);

  const { updateData, postData, isLoading, error, errList } = useMutation(
    API_ROUTE.CM_VISITORS,
    true
  );

  const {
    register,
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      state: "",
      phone_nos: [" "],
      email: [" "],
    },
    resolver: yupResolver(
      goingForeign ? visitorsGoingOutSchema : visitorsNotGoingOutSchema
    ),
  });

  useEffect(() => {
    if (selectCommonVisitingPurpose) {
      reset({
        ...watch(),
        visiting_purpose: selectCommonVisitingPurpose?.description,
      });
    }
  }, [reset, selectCommonVisitingPurpose, watch]);

  useEffect(() => {
    if (selectInformationChannel) {
      reset({
        ...watch(),
        information_channel: selectInformationChannel?.description,
      });
    }
  }, [reset, selectInformationChannel, watch]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_nos" as never,
  });

  // useEffect(() => {
  //     console.log("fields", fields);
  // }, [fields]);

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    name: "email" as never,
    control,
  });
  useValidationError({ errList, setError });
  useHandleShowError(error);

  const handleResetForm = useCallback(() => {
    const dataDetails: IVisitorResponse = location?.state?.data;
    const country = getSelectPropsFromCountry(dataDetails?.country);
    const visitingCountry = getSelectPropsFromCountry(
      dataDetails?.visiting_country
    );
    const registrationDateObj = moment(dataDetails.registration_date)
      .format()
      .split("T")[0];
    const expectedTakeUpDateObj = moment(dataDetails.expected_take_off_date)
      .format()
      .split("T")[0];

    setSelectedCountry(country);
    setSelectedVisitingCountry(visitingCountry);
    setSelectedVisaType(dataDetails?.visa_type_id);
    reset({
      ...dataDetails,
      registration_date: registrationDateObj,
      expected_take_off_date: expectedTakeUpDateObj,
      visiting_purpose: dataDetails?.visiting_purpose,
    });
  }, [location?.state?.data, reset]);

  useEffect(() => {
    if (location?.state?.data && location?.state?.data?.id) {
      handleResetForm();
    }
  }, [handleResetForm, location?.state, reset]);

  const handleClearForm = () => {
    reset({});
    setSelectedCountry(undefined);
  };

  const onFormSubmit = handleSubmit(async (data: IFormData) => {
    if (!selectedCountry) {
      toast.error("Please select country");
      return;
    }

    // if (!selectInformationChannel) {
    //     toast.error("Please select information channel");
    //     return;
    // }

    if (goingForeign) {
      if (!selectedVisitingCountry) {
        toast.error("Please select visiting country");
        return;
      }
      // if (!selectedVisaType) {
      //     toast.error("Please select visa type");
      //     return;
      // }
    }

    let response;

    if (location?.state?.data?.id) {
      let updatePayload: IVisitorPayload | IVisitorPayloadNoForeign;
      if (goingForeign) {
        updatePayload = {
          ...data,
          registration_date: moment(data.registration_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          expected_take_off_date: moment(data.expected_take_off_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          country: selectedCountry?.value ?? "",
          visa_type_id: selectedVisaType?.id ?? "",

          going_to_foreign: goingForeign,
          visiting_country: selectedVisitingCountry?.value ?? "",
          agent_id: selectedAgent?.id ?? "",
        };
      } else {
        updatePayload = {
          registration_date: moment(data.registration_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          information_channel: data.information_channel,
          first_name: data.first_name,
          last_name: data.last_name,
          country: selectedCountry?.value ?? "",
          state: data.state,
          visiting_purpose: data.visiting_purpose,
          street_address: data.street_address,
          phone_nos: data.phone_nos,
          email: data.email,
          agent_id: selectedAgent?.id ?? "",
          going_to_foreign: goingForeign,
          remarks: data.remarks,
        };
      }

      response = await updateData(location?.state?.data?.id, updatePayload);
      if (response?.data?.status === "ok") {
        toast.success("Visitor updated Successfully");
        navigate(-1);
      }
    } else {
      let payload: IVisitorPayload | IVisitorPayloadNoForeign;

      if (goingForeign) {
        payload = {
          ...data,
          registration_date: moment(data.registration_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          expected_take_off_date: moment(data.expected_take_off_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          country: selectedCountry?.value ?? "",
          visa_type_id: selectedVisaType?.id ?? "",

          going_to_foreign: goingForeign,
          visiting_country: selectedVisitingCountry?.value ?? "",
          agent_id: selectedAgent?.id ?? "",
        };
      } else {
        payload = {
          registration_date: moment(data.registration_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          information_channel: data.information_channel,
          first_name: data.first_name,
          last_name: data.last_name,
          country: selectedCountry?.value ?? "",
          state: data.state,
          visiting_purpose: data.visiting_purpose,
          street_address: data.street_address,
          phone_nos: data.phone_nos,
          email: data.email,
          agent_id: selectedAgent?.id ?? "",
          going_to_foreign: goingForeign,
          remarks: data.remarks,
        };
      }
      response = await postData(payload);
      if (response?.data?.status === "ok") {
        toast.success("Visitor Added  Successfully");
        navigate(-1);
      }
    }
  });

  return (
    <div>
      <CompanyBreadcrumb
        title="Customer Manangement Enrollments"
        showBreadcrumb={true}
        btnText="Back"
      />
      <div className="card shadow-sm ">
        <div className="card-header">
          <h3 className="card-title">Add Visitor Details</h3>
          <div className="card-toolbar">
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleClearForm}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="card-body">
          <form className="form w-100 " onSubmit={onFormSubmit}>
            <div className="row">
              {/* Personal Details */}
              <div className="col-12 mb-3">
                <div>
                  <h2 className="fw-bold mb-5" id="custom-form-control">
                    Personal Details
                  </h2>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 gap-5 gap-md-7 mb-6 d-flex align-items-center ">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container ">
                      <div className="form-check form-switch form-check-custom form-check-solid ">
                        <input
                          value="true"
                          onChange={(e) => {
                            setGoingForeign(e.target.checked);
                          }}
                          type="checkbox"
                          className="form-check-input cursor-pointer"
                        />
                        <label className="form-check-label">
                          Going for Foreign
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Registration Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter your first name."
                        {...register("registration_date")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.registration_date?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Information Channel:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter your visiting purpose."
                        {...register("information_channel")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.information_channel?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Information Channel:
                      </label>
                      <AsyncReactSelect
                        placeholder="Search.."
                        baseUrl={API_ROUTE.CM_INFORMATION_CHANNEL}
                        setSelectValue={setSelectInformationChannel}
                        selectValue={selectInformationChannel}
                        dataId={"id" as never}
                        showDataLabel={"description" as never}
                      />
                    </div>
                  </div>

                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="form-label">Agent:</label>

                      <AsyncReactSelect
                        placeholder="Search.."
                        baseUrl={API_ROUTE.CM_AGENTS}
                        setSelectValue={setSelectedAgent}
                        selectValue={selectedAgent}
                        dataId={"id" as never}
                        showDataLabel={"first_name" as never}
                      />
                    </div>
                  </div>

                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your first name."
                        {...register("first_name")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.first_name?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">Last Name:</label>
                      <input
                        className="form-control"
                        placeholder="Enter your last name."
                        {...register("last_name")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.last_name?.message}
                      </div>
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Phone Number:
                      </label>

                      {fields.map((field, index) => (
                        <div key={field.id} className="form-group mb-3">
                          <div className="d-flex">
                            <input
                              className="form-control me-3"
                              placeholder={`Enter phone number ${index + 1}`}
                              {...register(`phone_nos.${index}`)}
                            />
                            <div className="flex-center cursor-pointer">
                              <XCircle
                                onClick={() => remove(index)}
                                color="gray"
                                size={25}
                              />
                            </div>
                          </div>

                          {errors?.phone_nos && errors?.phone_nos[index] && (
                            <p className="fv-plugins-message-container invalid-feedback ps-2">
                              {errors?.phone_nos[index]?.message}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => append("")}
                        >
                          Add More Phone Number
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Email Address:
                      </label>
                      {emailFields.map((field, index) => (
                        <div key={field.id} className="form-group mb-3">
                          <div className="d-flex">
                            <input
                              className="form-control me-3"
                              placeholder={`Enter phone number ${index + 1}`}
                              {...register(`email.${index}`)}
                            />
                            <div className="flex-center cursor-pointer">
                              <XCircle
                                onClick={() => removeEmail(index)}
                                color="gray"
                                size={25}
                              />
                            </div>
                          </div>
                          {errors?.email && errors?.email[index] && (
                            <p className="fv-plugins-message-container invalid-feedback">
                              {errors?.email[index]?.message}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => appendEmail("")}
                        >
                          Add More Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Personal Details Ends */}
              <hr className="bg-gray-100 mb-6 " />

              {/* Address starts */}
              <div className="col-12 mb-6">
                <div>
                  <h2 className="fw-bold mb-5" id="custom-form-control">
                    Address Details
                  </h2>
                </div>
                <div className="row">
                  <div className="col-12 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Full Address
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter your full address."
                        {...register("street_address")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.street_address?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7   mb-6">
                    <div>
                      <label className="required form-label">
                        Visitor's State /province
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter your state"
                        {...register("state")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.state?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6  gap-5 gap-md-7   mb-6">
                    <div>
                      <label className="required form-label">Country</label>
                      <CountryCode
                        placeholder="Select Country"
                        forCountry={true}
                        selectValue={selectedCountry}
                        setSelectValue={setSelectedCountry}
                      />
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Visiting Purpose
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter your visiting purpose."
                        {...register("visiting_purpose")}
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.visiting_purpose?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 gap-5 gap-md-7 mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className="required form-label">
                        Common Visiting Purpose:
                      </label>
                      <AsyncReactSelect
                        placeholder="Search.."
                        baseUrl={API_ROUTE.CM_VISITING_PURPOSES}
                        setSelectValue={setSelectCommonVisitingPurpose}
                        selectValue={selectCommonVisitingPurpose}
                        dataId="id"
                        showDataLabel="description"
                      />
                    </div>
                  </div>
                  <div className="col-12 gap-5 gap-md-7  mb-6">
                    <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                      <label className=" form-label">Remarks</label>
                      <textarea
                        className="form-control"
                        {...register("remarks")}
                        placeholder="description"
                      />
                      <div className="fv-plugins-message-container invalid-feedback">
                        {errors.remarks?.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Address Details Ends */}
              <hr className="bg-gray-100 mb-6 " />
              {/* Visiting Details */}
              {goingForeign && (
                <div className="col-12 mb-6">
                  <div>
                    <h2 className="fw-bold mb-5" id="custom-form-control">
                      Visiting Details
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-6  gap-5 gap-md-7   mb-6">
                      <div>
                        <label className="required form-label">Country</label>
                        <CountryCode
                          placeholder="Select Visiting Country"
                          forCountry={true}
                          selectValue={selectedVisitingCountry}
                          setSelectValue={setSelectedVisitingCountry}
                        />
                      </div>
                    </div>
                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="required form-label">Visa Type</label>
                        <AsyncReactSelect
                          placeholder="Search.."
                          baseUrl={API_ROUTE.GET_VISA_TYPES}
                          setSelectValue={setSelectedVisaType}
                          selectValue={selectedVisaType}
                          dataId="id"
                          showDataLabel="description"
                        />
                      </div>
                    </div>
                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="form-label">Visiting State</label>
                        <input
                          className="form-control"
                          placeholder="How do you know about our office ?"
                          {...register("visiting_country_state")}
                        />
                        <div className="fv-plugins-message-container invalid-feedback">
                          {errors.visiting_country_state?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="required form-label">
                          Deal Amount
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Enter deal amount"
                          {...register("deal_amount", {
                            valueAsNumber: true,
                          })}
                        />
                        <div className="fv-plugins-message-container invalid-feedback">
                          {errors.deal_amount?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="form-label">Applied Position</label>
                        <input
                          className="form-control"
                          placeholder="Enter your visiting purpose."
                          {...register("applied_position")}
                        />
                        <div className="fv-plugins-message-container invalid-feedback">
                          {errors.applied_position?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="required form-label">
                          Expected Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your visiting purpose."
                          {...register("expected_salary_pa", {
                            valueAsNumber: true,
                          })}
                        />
                        <div className="fv-plugins-message-container invalid-feedback">
                          {errors.expected_salary_pa?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 gap-5 gap-md-7 mb-6">
                      <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                        <label className="required form-label">
                          Expected Take Off Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Enter your visiting purpose."
                          {...register("expected_take_off_date")}
                        />
                        <div className="fv-plugins-message-container invalid-feedback">
                          {errors.expected_take_off_date?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Visiting Details Ends */}

              <div className="col-12 d-flex justify-content-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary  mb-6"
                >
                  {isLoading ? (
                    <>
                      <span className="ms-2">Please Wait...</span>
                      <Spinner
                        size="sm"
                        animation="border"
                        role="status"
                      ></Spinner>
                    </>
                  ) : (
                    <span>
                      {location?.state?.data?.id ? "Update" : "Submit"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVisitor;
