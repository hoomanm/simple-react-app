import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ name, value, error, onChange }) => {
  const className = error ? 'textField error' : 'textField'
  return (
    <div>
      <div className="textField-container">
        <input type="text" className={className} name={name} value={value} onChange={onChange} />
      </div>
      <div className="errorMessage">{error ? error : ''}</div>
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextField
