import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Modal = ({ show, title, message, handleClose, handleCancel }) => {
  const modalClassName = show ? 'modal open' : 'modal close'

  return (
    <div className={modalClassName}>
      <div className="modal-body">
        <div className="modal-header">
          {title}
        </div>
        <div className="modal-content">
          {message}
        </div>
        <div className="modal-buttons">
          <Button onClick={handleCancel} type="button"> Yes </Button>
          <Button onClick={handleClose} type="button"> No </Button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func,
  handleCancel: PropTypes.func,
}

export default Modal
