import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface ISearchBarProps {
    placeholder: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    setFetchAgain: (fetchAgain: boolean) => void;
}

const SearchBar = (props: ISearchBarProps) => {
    const { placeholder, searchTerm, setSearchTerm } = props;
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (value.length <= 3) {
            return;
        } else {
            const timer = setTimeout(() => setSearchTerm(value), 500);
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const resetSearchTerm = () => {
        setValue("");
        setSearchTerm("");
    };

    return (
        <InputGroup size='sm' className='mb-3'>
            <Form.Control
                type='text'
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {searchTerm.length > 0 && (
                <Button size='sm' onClick={resetSearchTerm} variant='warning'>
                    <i className='fa fa-close' aria-hidden='true'></i>
                </Button>
            )}
        </InputGroup>
    );
};

export default SearchBar;
