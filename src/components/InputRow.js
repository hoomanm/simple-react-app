import React from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import MultiSelect from './MultiSelect'
import Label from './Label'
import Checkbox from './Checkbox'

const InputRow = ({ type, label, name, value, error, onChange, required }) => (
  <div className={`row ${!label ? 'indented' : ''}`}>
    {/* Label */}
    <div className="label-container">
      <Label required={required}>{label ? label : ''}</Label>
    </div>

    <div className={`input-field-container ${!label ? 'indented' : ''}`}>
      {/* Text Field */}
      {type.name === 'textField' &&
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          error={error}
        />
      }

      {/* Multi-select Field */}
      {type.name === 'multiSelect' &&
        <MultiSelect
          placeholder={label}
          options={type.options}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
        />
      }

      {/* Checkbox */}
      {type.name === 'checkbox' &&
        <Checkbox
          label={type.label}
          name={type.label.toLowerCase()}
          onChange={onChange}
          checked={value}
        />
      }
    </div>
  </div>
)

InputRow.propTypes = {
  label: PropTypes.string,
  type: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  error: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

export default InputRow
