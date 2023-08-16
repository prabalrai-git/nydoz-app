import { FieldValues, UseFormReset, DeepPartial } from "react-hook-form";

interface DynamicFormResetProps<T extends FieldValues> {
    reset: UseFormReset<T>;
    defaultValues: DeepPartial<T>;
}

function FormReset<T extends FieldValues>({
    reset,
    defaultValues,
}: DynamicFormResetProps<T>) {
    const handleReset = () => {
        reset(defaultValues);
    };

    return (
        <button
            type='button'
            className='btn btn-light btn-sm'
            onClick={handleReset}>
            Reset
        </button>
    );
}

export default FormReset;
