import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IDynamicForm } from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DynamicForm = () => {
    const navigate = useNavigate();
    const { isLoading, data, postData, errList, error } = useMutation(
        API_ROUTE.PAYMENT_METHODS,
        true
    );

    const defaultValues: IDynamicForm = {
        name: "",
        is_account_required: false,
        custom_fields: [
            {
                name: "",
                type: "text",
                options: "",
                is_required: true,
                multiple_value: false,
            },
        ],
    };

    const forMultipleValues = ["select", "checkbox", "radio"];

    const { watch, handleSubmit, control, register } = useForm({
        defaultValues: defaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "custom_fields",
    });

    const onSubmit = async (data: IDynamicForm) => {
        console.log(data);

        const payload = data.custom_fields.map((field) => {
            const optionArry = field.options.split(",");

            return {
                name: field.name,
                type: field.type,
                options: optionArry,
                is_required: field.is_required,
                multiple_value: field.multiple_value,
            };
        });

        console.log(payload, "payload");

        try {
            const response = await postData({
                ...data,
                custom_fields: payload,
            });
            if (response?.status === 201) {
                toast.success("Payment Method Added Successfully");
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const typeValues = watch(`custom_fields`);
    const formName = watch(`name`);
    const formRequired = watch(`is_account_required`);

    useEffect(() => {
        console.log("formRequired", formRequired);
    }, [formRequired]);

    return (
        <div className='card p-6 row'>
            <div className='col-12 mb-6'>
                <h3>Add Payment Method</h3>
            </div>
            <div className='col-12'>
                <div className=''>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input
                                className='form-control'
                                {...register("name")}
                                placeholder='Name'
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='form-label mx-3'>
                                Is Account Required
                            </label>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                value='true'
                                {...register("is_account_required", {
                                    setValueAs: (value) => value === true,
                                })}
                            />
                        </div>
                        <div>
                            {fields.map((field, index) => {
                                const indexValue = index;
                                return (
                                    <div
                                        className='my-6 shadow shadow-sm p-6'
                                        key={field.id}>
                                        <h5 className='text-info my-3'>
                                            SN : {index + 1}
                                        </h5>
                                        <div className='mb-3'>
                                            <label className='form-label'>
                                                Input Field Name
                                            </label>
                                            <input
                                                type='text'
                                                {...register(
                                                    `custom_fields.${indexValue}.name`
                                                )}
                                                placeholder='Enter the Field Name'
                                                className='form-control'
                                            />
                                        </div>
                                        <div className='mb-6'>
                                            <label className='form-label'>
                                                Input Type
                                            </label>
                                            <select
                                                {...register(
                                                    `custom_fields.${indexValue}.type`
                                                )}
                                                className='form-select'>
                                                <option value='text'>
                                                    Text
                                                </option>
                                                <option value='select'>
                                                    Select
                                                </option>
                                                <option value='checkbox'>
                                                    Checkbox
                                                </option>
                                                <option value='radio'>
                                                    Radio
                                                </option>
                                                <option value='textarea'>
                                                    Textarea
                                                </option>
                                            </select>
                                        </div>

                                        {forMultipleValues.includes(
                                            typeValues[index].type
                                        ) && (
                                            <input
                                                type='text'
                                                {...register(
                                                    `custom_fields.${index}.options`
                                                )}
                                                placeholder={`Enter the options separated by comma`}
                                                className='form-control mb-3'
                                            />
                                        )}

                                        <div className='d-flex justify-content-between'>
                                            <div className='my-3'>
                                                <label className='form-label mx-3'>
                                                    Is Input Field Required
                                                </label>
                                                <input
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    {...register(
                                                        `custom_fields.${indexValue}.is_required`
                                                    )}
                                                />
                                            </div>
                                            <button
                                                className='btn btn-light-danger btn-sm '
                                                onClick={() => remove(index)}>
                                                Delete Input field
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className='d-flex '>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-sm btn-info'
                                    onClick={() =>
                                        append({
                                            name: "",
                                            type: "text",
                                            options: "",
                                            is_required: true,
                                            multiple_value: true,
                                        })
                                    }>
                                    Add More Custom Field
                                </button>
                            </div>
                        </div>

                        {/* <pre>{JSON.stringify(typeValues, null, 2)}</pre> */}
                        <div className='d-flex my-6 justify-content-end'>
                            <button
                                className='btn btn-primary btn-sm'
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='col-12 '>
                <div className='form-container'>
                    <div className='card form-view-container p-6'>
                        <div className='card-header mb-2'>
                            <h3 className='card-title'>
                                {formName ? formName : "Form Name"}
                            </h3>
                            <div className='card-toolbar'>
                                <button
                                    type='button'
                                    className='btn btn-sm btn-light'>
                                    {formRequired
                                        ? formRequired.toString()
                                        : "Required"}
                                </button>
                            </div>
                        </div>
                        <form className='min-h-225px'>
                            {typeValues.map((field, index) => {
                                return (
                                    <div className=' my-3 ' key={index}>
                                        <label
                                            className={
                                                field.is_required
                                                    ? "form-label required"
                                                    : "form-label"
                                            }>
                                            {field.name
                                                ? field.name
                                                : "Field Name"}
                                        </label>
                                        {field.type === "text" && (
                                            <input
                                                className='form-control'
                                                {...register(
                                                    "is_account_required"
                                                )}
                                                type='text'
                                            />
                                        )}
                                        {field.type === "select" && (
                                            <select
                                                className='form-select'
                                                {...register(
                                                    "is_account_required"
                                                )}>
                                                {field.options
                                                    .split(",")
                                                    .map((option, index) => {
                                                        return (
                                                            <option key={index}>
                                                                {option}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        )}
                                        {field.type === "checkbox" &&
                                            field.options
                                                .split(",")
                                                .map((option, index) => {
                                                    return (
                                                        <div
                                                            className='form-checkbox'
                                                            key={index}>
                                                            <input type='checkbox' />
                                                            <label>
                                                                {option}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                        {field.type === "radio" &&
                                            field.options
                                                .split(",")
                                                .map((option, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <input
                                                                className='form-radio'
                                                                type='radio'
                                                            />
                                                            <label>
                                                                {option}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                        {field.type === "textarea" && (
                                            <textarea></textarea>
                                        )}
                                    </div>
                                );
                            })}
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-success'>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;
