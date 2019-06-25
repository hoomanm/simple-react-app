import React from 'react'
import Label from './Label'
import PropTypes from 'prop-types'

const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="checkbox-container">
    <Label className="checkbox-label">
      <input type="checkbox" name={name} className="checkbox" onChange={onChange} checked={checked} />
      <span className="checkmark" />
      {label}
    </Label>
  </div>
)

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Checkbox
