import React, { Component } from 'react'

class DataTableBody extends Component {

  render() {
    return (
      <tbody>
        {
          this.props.data.map(function(dataResult, dataIndex) {
            return (
              <tr key={dataIndex}>
                {
                  this.props.columns.map(function(headerResult, headerIndex) {
                    return <td key={headerIndex}>{dataResult[headerResult.property]}</td>
                  })
                }
              </tr>
            )
          }.bind(this))
        }
      </tbody>
    )
  }

}

DataTableBody.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
}

export default DataTableBody