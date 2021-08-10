import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    images: [],
    query: '',
  };

  formSubmitHandler = inputValue => {
    this.setState({ query: inputValue });
  };

  render() {
    const { query } = this.state;
    const { formSubmitHandler } = this;

    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery query={query} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
