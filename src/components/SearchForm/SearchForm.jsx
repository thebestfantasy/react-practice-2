import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  onInputChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase().trim(),
    });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onHandleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.onInputChange}
          value={this.state.searchQuery}
        />
      </SearchFormStyled>
    );
  }
}
