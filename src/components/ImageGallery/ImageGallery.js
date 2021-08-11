import { Component } from 'react';
import imageGalleryApi from '../../services/image-gallery-api';
import PropTypes from 'prop-types';

import GalleryLoader from '../GalleryLoader';
import QueryError from '../QueryError';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    showModal: false,
    modalImgUrl: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevSate) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: 'pending' });

      const query = this.props.query;

      imageGalleryApi
        .fetchImages(query)
        .then(({ hits }) => {
          this.setState({
            images: hits,
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          }),
        );
    }
  }

  onGalleryImgClick = e => {
    const modalImgUrl = e.target.dataset.src;

    this.setState(({ showModal }) => ({
      modalImgUrl: modalImgUrl,
      showModal: !showModal,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleBtnClick = e => {
    console.log(e);
  };

  render() {
    const { images, status, error, showModal, modalImgUrl } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <GalleryLoader />;
    }

    if (status === 'rejected') {
      return <QueryError queryError={error} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onClick={this.handleBtnClick}
                />
              );
            })}
          </ul>

          {showModal && modalImgUrl && (
            <Modal modalImgUrl={modalImgUrl} onClose={this.closeModal} />
          )}

          <Button onClick={this.handleBtnClick} />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
