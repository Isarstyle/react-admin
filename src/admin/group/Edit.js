import React, { Component } from 'react'

import Content from '../templates/base/Content'
import Form from './Form'
import Alert from '../../components/Alert'
import Service from '../../utils/Service'

class GroupEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: null,
      group: null
    }

    this._service = new Service('groups')

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this._service.show(this.props.params.id)
      .then(response => {
        this.setState({
          group: response
        })
      })
  }

  handleSubmit(values) {
    this._service.update(values)
      .then(response => {
        this.setState({
          message: {
            type: 'success',
            text: 'Group updated successfully'
          }
        })
      })
      .catch(error => {
        this.setState({
          message: {
            type: 'danger',
            text: 'Cannot update group'
          }
        })
      })
  }

  render() {
    return (
      <Content {...this.props}>
        <Alert message={this.state.message}/>
        <Form initialValues={this.state.group} onSubmit={this.handleSubmit} />
      </Content>
    )
  }

}

GroupEdit.defaultProps = {
  title: 'Groups',
  subtitle: 'Updating group',
  breadcrumb: [
    { 'url': '/admin/groups', 'desc': 'Groups' },
    { 'desc': 'Edit' }
  ]
}

export default GroupEdit
