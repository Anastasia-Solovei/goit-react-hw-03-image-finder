import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  onImageGalleryItemClick = largeImageURL => {
    this.props.onClick(largeImageURL);
  };

  render() {
    const { images } = this.props;

    return (
      <ul className={s.ImageGallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.onImageGalleryItemClick}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
