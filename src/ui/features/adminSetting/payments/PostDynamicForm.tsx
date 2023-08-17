import { useForm, useFieldArray } from "react-hook-form";

const formFields = [
    {
        name: "account Name ",
        type: "text",
        options: "",
        is_required: true,
        multiple_value: true,
    },
    {
        name: "Account type",
        type: "select",
        options: "Saving Account ,Current Account",
        is_required: true,
        multiple_value: true,
    },
    {
        name: "Currency Type",
        type: "checkbox",
        options: "USD,UK,INR,NPR",
        is_required: true,
        multiple_value: true,
    },
    {
        name: "",
        type: "radio",
        options: "Mobile Banking, Internet Banking,Cash Book ",
        is_required: true,
        multiple_value: true,
    },
    {
        name: "describe your self",
        type: "textarea",
        options: "",
        is_required: true,
        multiple_value: true,
    },
];

const PostDynamicForm = () => {
    const { watch, handleSubmit, control, register } = useForm({});

    return (
        <div>
            <form>
                {formFields.map((field, index) => {
                    return (
                        <div key={index}>
                            <label>{field.name}</label>
                            {field.type === "text" && (
                                <input
                                    {...register("is_account_required")}
                                    type='text'
                                />
                            )}
                            {field.type === "select" && (
                                <select {...register("is_account_required")}>
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
                                            <div key={index}>
                                                <input type='checkbox' />
                                                <label>{option}</label>
                                            </div>
                                        );
                                    })}
                            {field.type === "radio" &&
                                field.options
                                    .split(",")
                                    .map((option, index) => {
                                        return (
                                            <div key={index}>
                                                <input type='radio' />
                                                <label>{option}</label>
                                            </div>
                                        );
                                    })}
                            {field.type === "textarea" && <textarea></textarea>}
                        </div>
                    );
                })}
                <button className='btn btn-success'>
                    <span>Submit</span>
                </button>
            </form>
        </div>
    );
};

export default PostDynamicForm;
