import { useState } from 'react';
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

    const handleSubmit = e => {
        e.preventDefault();
        const searchQuery = searchName.trim();

        onSubmit(searchQuery);
        setSearchName('');
    };

    return (
        <div>
            <SearchHeader>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name='searchName'
                    />
                    
                    <SearchButton>
                        <SearchLabel>Search</SearchLabel>
                    </SearchButton>
                </SearchForm>
            </SearchHeader>
        </div>
    );
};
    
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};