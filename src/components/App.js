import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import imageGalleryApi from '../services/image-gallery-api';

import Searchbar from './Searchbar';
import ImgGallery from './ImgGallery';
import GalleryLoader from './GalleryLoader';
import QueryError from './QueryError';
import Modal from './Modal';
import Button from './Button';

class App extends Component {
  state = {
    query: '',
    status: 'idle',
    page: 1,
    images: [],
    showLoadMore: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({
        status: 'pending',
        page: 1,
        images: [],
      });

      const { query, page } = this.state;

      this.getImages(query, page);
    }
  }

  getImages = (query, page) => {
    imageGalleryApi
      .fetchImages(query, page)
      .then(({ hits }) => {
        if (hits.length < 12) {
          this.setState({
            showLoadMore: false,
          });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
          page: prevState.page + 1,
          showLoadMore: true,
        }));
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        }),
      )
      .finally(() => {
        this.handleScrollDown();
      });
  };

  formSubmitHandler = inputValue => {
    this.setState({ query: inputValue });
  };

  handleOpenModal = e => {
    const modalImgUrl = e.target.dataset.src;

    this.setState({
      modalImgUrl: modalImgUrl,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLoadMore = () => {
    console.log(this.state.page);

    const { query, page } = this.state;
    this.getImages(query, page);
  };

  handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, status, error, showModal, modalImgUrl } = this.state;
    const { formSubmitHandler, handleOpenModal, handleCloseModal } = this;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          <GalleryLoader />;
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          <QueryError queryError={error} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          <ImgGallery images={images} onClick={handleOpenModal} />
          {showModal && (
            <Modal onClose={handleCloseModal}>
              <img src={modalImgUrl} alt="" />
            </Modal>
          )}
          <Button onClick={this.handleLoadMore} />
          <ToastContainer autoClose={3000} />
        </>
      );
    }
  }
}

export default App;
