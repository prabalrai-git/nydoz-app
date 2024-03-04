import { useForm, useFieldArray } from "react-hook-form";
import { ITransactionTypeFields } from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";

const AddTransactionTypes = () => {
  const navigate = useNavigate();
  const { postData, errList, error } = useMutation(
    API_ROUTE.POST_TRANSACTION_TYPE,
    true
  );

  const defaultValues: ITransactionTypeFields = {
    name: "",
    description: "",
    transaction_effect: "",
  };

  const { watch, handleSubmit, control, register, setError } = useForm({
    defaultValues: defaultValues,
  });

  useValidationError({ errList, setError });
  useHandleShowError(error);

  const onSubmit = async (data: ITransactionTypeFields) => {
    // console.log(data);

    // console.log(payload, "payload");

    try {
      const response = await postData({
        ...data,
      });
      if (response?.status === 201) {
        toast.success("Transaction Type Added Successfully");
        navigate(-1);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // const formName = watch(`name`);

  return (
    <div className="card p-6 row">
      <div className="col-12 mb-6">
        <h3>Add Transaction Types</h3>
      </div>
      <div className="col-12">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                {...register("name")}
                placeholder="Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                {...register("description")}
                placeholder="Description"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Transaction Effect</label>
              <input
                className="form-control"
                {...register("transaction_effect")}
                placeholder="Transaction Effect"
              />
            </div>

            {/* <pre>{JSON.stringify(typeValues, null, 2)}</pre> */}
            <div className="d-flex my-6 justify-content-end">
              <button className="btn btn-primary btn-sm" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionTypes;
