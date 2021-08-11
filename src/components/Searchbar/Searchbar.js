import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;

    this.setState({ inputValue: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('Please, enter your query!');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    const { handleSubmit, handleInputChange } = this;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
