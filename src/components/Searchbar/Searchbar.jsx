import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    SearchHeader,
    SearchForm,
    SearchButton,
    SearchLabel,
    SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
    const [searchName, setSearchName] = useState('');

    const handleNameChange = e => {
        setSearchName(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (searchName.trim() === '') {
            return alert(`Please, enter the word for search!`);
        }
        onSubmit(searchName);
        setSearchName('');
    };

    return (
        <SearchHeader>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name='searchName'
                    onChange={handleNameChange}
                    value={searchName}
                />
                    
                <SearchButton>
                    <SearchLabel>Search</SearchLabel>
                </SearchButton>
            </SearchForm>
        </SearchHeader>
    );

};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
