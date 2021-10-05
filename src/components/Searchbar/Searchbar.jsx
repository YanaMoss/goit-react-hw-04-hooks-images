import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarForm,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.replace(' ', '+'));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.info('Введите текс для поиска.');
      return;
    }
    onSubmit(query);
  };
  return (
    <SearchbarForm>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarForm>
  );
}
