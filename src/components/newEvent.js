import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react'
import AuthAdapter from '../lib/AuthAdapter'

export default class NewEvent extends Component {
  state = {
     modalOpen: false,
     description: ""
    }


  changeHandler = (e) => {
    // description = e.target.value
    this.setState({
      description: e.target.value
    })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  submitHandler = () => {
    console.log("new event compoent")
    this.props.newEvent(this.state.description)
    this.handleClose()
    this.setState({ modalOpen: false })
  }



  render() {
    return (
      <Modal
      trigger={<Button onClick={this.handleOpen}>new event</Button>}
      centered={false}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
      >
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Form>
        <h3>new event</h3>
          <Form.Field>
            <label>Description</label>
            <input placeholder='' name='name' value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
          </Form.Field>
          <Button type='submit' onClick={this.submitHandler}>Submit</Button>
      </Form>
      <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>category</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
  }
}

// export default NewEvent
