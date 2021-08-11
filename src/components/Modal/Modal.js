import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { handleOverlayClick } = this;
    const { modalImgUrl } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={handleOverlayClick}>
        <div className={s.Modal}>
          <img src={modalImgUrl} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  modalImgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
