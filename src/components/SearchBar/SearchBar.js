import { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  SearchBarStyled,
  SearchFormStyled,
  SearchBtn,
  SearchFormLabelStyled,
  SearchFormInputStyled,
} from './SearchBar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() !== '') {
      this.props.onFormSubmit(this.state.searchQuery);
      this.setState(this.searchQuery);
    } else toast.error('Input field must not be empty');
  };

  render() {
    return (
      <SearchBarStyled>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <SearchFormLabelStyled>Search</SearchFormLabelStyled>
            <AiOutlineSearch />
          </SearchBtn>

          <SearchFormInputStyled
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
          />
        </SearchFormStyled>
      </SearchBarStyled>
    );
  }
}
