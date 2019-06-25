import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

// Add the selected option to the menu
const addOption = (selectedOption, options, setOptions, onChange, name) => {
  const value = selectedOption.target.getAttribute('data-value')
  if (!options.includes(value)) {
    const newOptions = [...options, value]
    const selectFields = document.getElementsByClassName("selectField")
    let targetSelectField = {}
    for (let i = 0; i < selectFields.length; i++) {
      if (selectFields[i].name === name) {
        targetSelectField = selectFields[i]
      }
    }
    for (let i = 0; i < targetSelectField.options.length; i++) {
      targetSelectField.options[i].selected = newOptions.indexOf(targetSelectField.options[i].value) >= 0
    }
    onChange(targetSelectField)
    setOptions(newOptions)
  }
}

// Unselect an option
const deleteOption = (selectedOption, options, setOptions, onChange, name) => {
  const index = options.indexOf(selectedOption)
  const newOptions = [...options.slice(0, index), ...options.slice(index + 1)]
  const selectFields = document.getElementsByClassName("selectField")
  let targetSelectField = {}
  for (let i = 0; i < selectFields.length; i++) {
    if (selectFields[i].name === name) {
      targetSelectField = selectFields[i]
    }
  }
  for (let i = 0; i < targetSelectField.options.length; i++) {
    targetSelectField.options[i].selected = newOptions.indexOf(targetSelectField.options[i].value) >= 0
  }
  onChange(targetSelectField)
  setOptions(newOptions)
}

const MultiSelect = ({ label, placeholder, options, name, value, onChange, error }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedOptions, setOptions] = useState([])
  const node = useRef()

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setShowMenu(false)
    }
  }
  useEffect(() => {
    setOptions(value)
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [value])

  const selectorClassName = error ? 'selector error' : 'selector'
  return (
    <div className="multiSelect-container" ref={node}>
      {label &&
        <Label>{label}</Label>
      }
      <div
        className={`${selectorClassName} ${showMenu ? 'withMenu' : ''}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        {selectedOptions.map((entry, i) => (
          <span key={i} className="selectedOption">
            {entry}
            <img
              className="x-icon"
              src={require('../assets/images/x-circle.svg')}
              weight={10}
              height={10}
              onClick={() => deleteOption(entry, selectedOptions, setOptions, onChange, name)}
            />
          </span>
        ))}
        <span className="selector-placeholder">{!selectedOptions.length && placeholder}</span>
        <span className="selector-icon">
          <img
            className="dropdown-icon"
            src={require("../assets/images/dropdown-arrow.png")}
            width="15"
            height="15"
          />
        </span>
      </div>
      {error &&
        <div className="errorMessage">{error}</div>
      }
      <select
        multiple
        className="selectField"
        value={value}
        name={name}
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option value={option} key={i}>{option}</option>
        ))}
      </select>
      <div className={`menu ${showMenu ? 'visible' : 'hidden'}`}>
        {options.map((option, i) => (
          <div
            key={i}
            data-value={option}
            className="menuItem"
            onClick={(selectedOption) =>
              addOption(selectedOption, selectedOptions, setOptions, onChange, name)
            }
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default MultiSelect
