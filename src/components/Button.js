import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type, disable, onClick }) => (
  <button
    type={type}
    className={disable ? 'button disable' : 'button active'}
    disabled={disable}
    onClick={onClick}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
