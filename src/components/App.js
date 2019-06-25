import React, { Fragment } from 'react'
import SellerForm from './SellerForm'
import SellerTable from './SellerTable'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sellers: JSON.parse(localStorage.getItem('sellers') || "[]"),
      editedSeller: {},
    }
    this.changeSellers = this.changeSellers.bind(this)
    this.removeFromSellers = this.removeFromSellers.bind(this)
    this.editSeller = this.editSeller.bind(this)
  }

  changeSellers (seller) {
    if (!seller.id) {
      seller['id'] = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
      const newSellers = [...this.state.sellers, seller]
      this.setState({
        sellers: newSellers,
      })
      localStorage.setItem('sellers', JSON.stringify(newSellers))
    } else {
      let index = 0
      this.state.sellers.forEach((existingSeller, i) => {
        if (existingSeller.id === seller.id) {
          index = i
        }
      })
      const updatedSellers = [
        ...this.state.sellers.slice(0, index),
        { ...seller },
        ...this.state.sellers.slice(index + 1),
      ]
      this.setState({
        sellers: updatedSellers,
        editedSeller: {},
      })
      localStorage.setItem('sellers', JSON.stringify(updatedSellers))
    }
  }

  removeFromSellers (id) {
    const updatedSellers = [...this.state.sellers]
    const targetIndex = this.state.sellers.map(seller => seller.id).indexOf(id)
    if (targetIndex !== -1) {
      updatedSellers.splice(targetIndex, 1)
      this.setState({
        sellers: updatedSellers,
      })
      localStorage.setItem('sellers', JSON.stringify(updatedSellers))
    }
  }

  editSeller (id) {
    this.state.sellers.forEach((seller) => {
      if (seller.id === id) {
        this.setState({
          editedSeller: seller,
        })
      }
    })
  }

  render () {
    return (
      <Fragment>
        <h3> Seller Form </h3>
        <SellerForm onSave={this.changeSellers} initialValues={this.state.editedSeller}/>
        <h3> Seller List </h3>
        <SellerTable sellers={this.state.sellers} onDelete={this.removeFromSellers} onEdit={this.editSeller}/>
      </Fragment>
    )
  }
}

export default App
