import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";

const ViewPaymentMethod = () => {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error, fetchDataById } = useFetch(
        API_ROUTE.PAYMENT_METHODS,
        true
    );

    useEffect(() => {
        if (id) fetchDataById(`${API_ROUTE.PAYMENT_METHODS}/${id}}`);
    }, [fetchDataById, id]);

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Payment Method</h3>
                <div className='card-toolbar'>
                    <button type='button' className='btn btn-sm btn-light'>
                        Edit
                    </button>
                </div>
            </div>
            <div className='card-body'>
                {/* <div className='col-12 '>
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
                                                        .map(
                                                            (option, index) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }>
                                                                        {option}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
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
                </div> */}
            </div>
        </div>
    );
};

export default ViewPaymentMethod;
