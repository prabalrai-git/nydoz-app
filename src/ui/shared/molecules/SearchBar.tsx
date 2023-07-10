import { useState, useEffect, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

interface ISearchBarProps {
    placeholder: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    setFetchAgain: (fetchAgain: boolean) => void;
}

const SearchBar = (props: ISearchBarProps) => {
    const { placeholder, searchTerm, setSearchTerm, setFetchAgain } = props;

    const handleFetchData = useCallback(() => {
        setFetchAgain(true);
    }, [setFetchAgain]);

    useEffect(() => {
        const delay = 300; // Debounce delay in milliseconds
        if (searchTerm.length >= 3) {
            const debounceTimer = setTimeout(() => {
                handleFetchData();
            }, delay);

            return () => clearTimeout(debounceTimer);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const resetSearchTerm = () => {
        setSearchTerm("");
        handleFetchData();
    };

    return (
        <InputGroup size='sm' className='mb-3'>
            <Form.Control
                type='text'
                value={searchTerm}
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
