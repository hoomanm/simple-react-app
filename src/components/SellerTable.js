import React from 'react'
import PropTypes from 'prop-types'

const SellerTable = ({ sellers, onDelete, onEdit }) => (
  <table>
    <tbody>
      <tr className="header">
        <td>Name</td>
        <td>Currencies</td>
        <td>Offices</td>
        <td className="deals">Bidded Deals</td>
        <td className="deals">Guaranateed Deals</td>
        <td> </td>
      </tr>
      {sellers.map((seller) => (
        <tr key={seller.id} className="body">
          <td className="name">{seller.name}</td>
          <td className="lists">{seller.currencies.join(', ')}</td>
          <td className="lists">{seller.offices.join(', ')}</td>
          <td className="deals">{seller.bidded ? 'Yes' : 'No'}</td>
          <td className="deals">{seller.guaranteed ? 'Yes' : 'No'}</td>
          <td className="actions">
            <img
              src={require('../assets/images/trash.jpeg')}
              width={20}
              height={20}
              onClick={() => onDelete(seller.id)}
            />
            <img
              src={require('../assets/images/pencil-edit.png')}
              width={25}
              height={25}
              onClick={() => onEdit(seller.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

SellerTable.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

export default SellerTable
