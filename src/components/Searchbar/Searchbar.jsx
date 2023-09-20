import { Component } from 'react';
import PropTypes from 'prop-types';
import {
    SearchHeader,
    SearchForm,
    SearchButton,
    SearchLabel,
    SearchInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
    state = {
        searchName: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        const searchQuery = e.target.elements.searchName.value.trim();
        this.props.onSubmit(searchQuery);
        e.target.reset();
    };

    render() {
        return (
            <SearchHeader>
                <SearchForm onSubmit={this.handleSubmit}>
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
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
