import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import InputRow from './InputRow'
import Modal from './Modal'

const officeOptions = ['UK', 'US', 'AU', 'JP', 'FR', 'IT']
const currencyOptions = ['USD', 'GBR', 'EUR']
const blankValues = {
  id: '',
  name: '',
  currencies: [],
  offices: [],
  bidded: false,
  guaranteed: false,
  contact: '',
  email: '',
}

class SellerForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formValues: {
        ...blankValues,
      },
      initialValues: {
        ...blankValues,
      },
      formErrors: [],
      pristine: true,
      editMode: false,
      showModal: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.findErrorMessage = this.findErrorMessage.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { initialValues } = nextProps
    if (Object.keys(initialValues).length !== 0) {
      this.setState({
        formValues: {
          ...initialValues,
        },
        initialValues,
        editMode: true,
      })
    } else {
      this.setState({
        formValues: {
          ...blankValues,
        },
      })
    }
  }

  handleInputChange (e) {
    const target = e.target ? e.target : e
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    let errors = [...this.state.formErrors]

    // Handle the multiple select fields
    if (target.type === 'select-multiple') {
      const newValues = []
      const { options } = target
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          newValues.push(options[i].value)
        }
      }
      // Add an error if no option is selected
      if (!newValues.length) {
        errors.push({
          fieldName: name,
          message: 'Required',
        })
      } else {
        errors = this.removeError(errors, name)
      }
      // Update the form state
      const newFormValues = {
        ...this.state.formValues,
        [name]: newValues,
      }
      this.setState({
        formValues: newFormValues,
        formErrors: errors,
        pristine: this.isPristine(newFormValues, this.state.initialValues),
      })

    // Handle the other form fields
    } else {
      // Seller Name field is required
      if (name === 'name' && !value) {
        errors.push({
          fieldName: name,
          message: 'Required',
        })
      } else {
        errors = this.removeError(errors, name)
      }
      // Email should be valid
      if (name === 'email') {
        //eslint-disable-next-line max-len
        var regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (value && !regex.test(value)) {
          errors.push({
            fieldName: name,
            message: 'Invalid email address',
          })
        } else if (value && regex.test(value)) {
          errors = this.removeError(errors, name)
        }
      }
      // Update the form state
      const newFormValues = {
        ...this.state.formValues,
        [name]: value,
      }
      this.setState({
        formValues: newFormValues,
        formErrors: errors,
        pristine: this.isPristine(newFormValues, this.state.initialValues),
      })
    }
  }

  handleSubmit (e) {
    const { formValues, initialValues } = this.state
    e.preventDefault()
    const errors = this.validateRequiredFields(formValues)
    if (errors.length) {
      this.setState({
        formErrors: errors,
      })
    } else {
      this.props.onSave(this.state.formValues)
      this.setState({
        formValues: initialValues,
        pristine: true,
        editMode: false,
      })
    }
  }

  handleCancel (e) {
    this.setState({
      formValues: {
        ...blankValues,
      },
      formErrors: [],
      pristine: true,
      editMode: false,
      showModal: false,
    })
  }

  closeModal () {
    this.setState({
      showModal: false,
    })
  }

  findErrorMessage (name) {
    const { formErrors } = this.state
    const error = formErrors.find(error => error.fieldName === name)
    return error ? error.message : ''
  }

  removeError (errors, name) {
    const { formErrors } = this.state
    const errorIndex = formErrors.map(error => error.fieldName).indexOf(name)
    return errorIndex === -1 ? errors : [...errors.slice(0, errorIndex), ...errors.slice(errorIndex + 1)]
  }

  isPristine (formValues, initialValues) {
    for (const key of Object.keys(formValues)) {
      if (typeof formValues[key] === 'object') {
        if (formValues[key].length !== initialValues[key].length ||
          !(formValues[key].sort().every((value, index) => (value === initialValues[key].sort()[index])))) {
          return false
        }
      } else if (formValues[key] !== initialValues[key]) {
        return false
      }
    }
    return true
  }

  validateRequiredFields (formValues) {
    console.log(formValues)
    const errors = []
    for (const key of Object.keys(formValues)) {
      if (key === 'name' && !formValues[key]) {
        errors.push({
          fieldName: key,
          message: 'Required',
        })
      }
      if ((key === 'currencies' || key === 'offices') && !formValues[key].length) {
        errors.push({
          fieldName: key,
          message: 'Required',
        })
      }
    }
    return errors
  }

  render () {
    const { formValues, formErrors, editMode, pristine } = this.state
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} noValidate>
          {/* Text field for seller name */}
          <InputRow
            type={{ name: 'textField' }}
            label="Seller Name"
            name="name"
            value={formValues.name}
            onChange={this.handleInputChange}
            error={this.findErrorMessage('name')}
            required
          />

          {/* Multi-select dropdown menus */}
          <InputRow
            type={{
              name: 'multiSelect',
              options: currencyOptions,
            }}
            label="Currencies"
            name="currencies"
            value={formValues.currencies}
            onChange={this.handleInputChange}
            error={this.findErrorMessage('currencies')}
            required
          />
          <InputRow
            type={{
              name: 'multiSelect',
              options: officeOptions,
            }}
            label="Offices"
            name="offices"
            value={formValues.offices}
            onChange={this.handleInputChange}
            error={this.findErrorMessage('offices')}
            required
          />

          {/* checkboxes */}
          <InputRow
            type={{
              name: 'checkbox',
              label: 'Bidded',
            }}
            label="Deal Type"
            value={formValues.bidded}
            onChange={this.handleInputChange}
            required
          />
          <InputRow
            type={{
              name: 'checkbox',
              label: 'Guaranteed',
            }}
            value={formValues.guaranteed}
            onChange={this.handleInputChange}
          />

          {/* Text field for email and contact name */}
          <InputRow
            type={{ name: 'textField' }}
            label="Contact Name"
            name="contact"
            value={formValues.contact}
            onChange={this.handleInputChange}
          />
          <InputRow
            type={{ name: 'textField' }}
            label="Email"
            name="email"
            value={formValues.email}
            onChange={this.handleInputChange}
            error={this.findErrorMessage('email')}
          />

          {/* Action buttons */}
          {console.log(pristine)}
          {console.log(formErrors)}
          {console.log(editMode)}
          <div className="buttons-container">
            <Button
              type="button"
              disable={!editMode && pristine}
              onClick={() => this.setState({ showModal: true })}
            >
              Cancel
            </Button>
            <Button type="submit" disable={pristine || !!formErrors.length}> Save </Button>
          </div>
        </form>
        <Modal
          show={this.state.showModal}
          title="Discard Changes?"
          message="Are you sure you want to discard your changes?"
          handleClose={this.closeModal}
          handleCancel={this.handleCancel}
        />
      </Fragment>
    )
  }
}

SellerForm.propTypes = {
  onSave: PropTypes.func,
  initialValues: PropTypes.object,
}

export default SellerForm
