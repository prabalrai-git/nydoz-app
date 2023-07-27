import { FieldValues, UseFormReset, DeepPartial } from "react-hook-form";

interface DynamicFormResetProps<T extends FieldValues> {
    title: string;
    reset: UseFormReset<T>;
    defaultValues: DeepPartial<T>;
    item:
        | {
              id: string;
              defaultValues: DeepPartial<T>;
          }
        | undefined;
}

function FormHeading<T extends FieldValues>({
    title,
    reset,
    defaultValues,
    item,
}: DynamicFormResetProps<T>) {
    const handleClear = () => {
        console.log("clear");
        reset(undefined);
    };

    const handleReset = () => {
        reset(defaultValues);
    };

    return (
        <>
            <div className='card-header'>
                <h3 className='card-title'>{title}</h3>
                {item?.id ? (
                    <div className='card-toolbar'>
                        <button
                            type='button'
                            className='btn btn-light btn-sm'
                            onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                ) : (
                    <div className='card-toolbar'>
                        <button
                            onClick={handleClear}
                            type='button'
                            className='btn btn-sm btn-light'>
                            Clear
                        </button>
                    </div>
                )}
            </div>
            {/* <Modal2
                showChildren={false}
                title='All date will get clear. Are you sure ?'
                cancelText='Cancel'
            /> */}
        </>
    );
}

export default FormHeading;
