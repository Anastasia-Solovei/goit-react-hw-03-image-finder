import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
//import imageGalleryApi from '../services/image-gallery-api';
import { connect } from 'react-redux';
import { getGalleryItems } from '../redux/operations';

import { galleryItems } from '../redux/selectors';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
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
    console.log(this.state.page);
    if (prevState.query !== this.state.query) {
      this.props.getGalleryItems(this.state.query, this.state.page);

      // this.setState({
      //   status: 'pending',
      //   page: 1,
      //   images: [],
      // });

      // const { query, page } = this.state;

      // this.handleFetchImages(query, page);
    }

    if (prevState.page !== this.state.page) {
      this.props.getGalleryItems(this.state.query, this.state.page);
    }
  }

  // handleFetchImages = (query, page) => {

  //   // imageGalleryApi
  //   //   .fetchImages(query, page)
  //   //   .then(({ hits }) => {
  //   //     if (hits.length < 12) {
  //   //       this.setState({
  //   //         showLoadMore: false,
  //   //       });
  //   //     }
  //   //     this.setState(prevState => ({
  //   //       images: [...prevState.images, ...hits],
  //   //       status: 'resolved',
  //   //       page: prevState.page + 1,
  //   //       showLoadMore: true,
  //   //     }));
  //   //   })
  //   //   .catch(error =>
  //   //     this.setState({
  //   //       error,
  //   //       status: 'rejected',
  //   //     }),
  //   //   )
  //   //   .finally(() => {
  //   //     this.handleScrollDown();
  //   //   });
  // };

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
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    // this.handleFetchImages(query, page);
  };

  handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      // images,
      status,
      error,
      showModal,
      modalImgUrl,
    } = this.state;
    const { formSubmitHandler, handleOpenModal, handleCloseModal } = this;
    const { images } = this.props;

    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ToastContainer autoClose={3000} />
        {!ImageGallery && <GalleryLoader />}
        {/* <QueryError queryError={error} /> */}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onClick={handleOpenModal} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}

        {showModal && (
          <Modal onClose={handleCloseModal}>
            <img src={modalImgUrl} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = store => {
  return { images: galleryItems(store) };
};
const mapDispatchToProps = { getGalleryItems };

export default connect(mapStateToProps, mapDispatchToProps)(App);
