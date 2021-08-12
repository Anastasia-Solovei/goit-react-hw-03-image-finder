import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import s from './ImgGallery.module.css';

const ImgGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
        );
      })}
    </ul>
  );
};

ImgGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func.isRequired,
};

export default ImgGallery;
