import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ className, children, checkbox, required }) => (
  <label className={className ? className : `label ${checkbox ? 'checkbox' : ''}`}>
    {children}
    {required &&
      <img
        className="asterisk"
        src={require('../assets/images/asterisk.png')}
        width={5}
        height={5}
      />
    }
  </label>
)

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  checkbox: PropTypes.bool,
  required: PropTypes.bool,
}

export default Label
