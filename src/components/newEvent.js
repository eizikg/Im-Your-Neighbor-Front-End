import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Label} from 'semantic-ui-react'
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
    this.setState({ modalOpen: false, description: "" })
  }



  render() {
    return (
      <Modal
      trigger={<div><Icon name="add circle huge icon" color="teal"onClick={this.handleOpen}></Icon><Label>new event</Label></div>}
      centered={false}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
      >
    <Modal.Header>Request for help</Modal.Header>
    <Modal.Content image>
      <Form>
          <Form.TextArea placeholder="Describe your problem" value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
          <Label onClick={this.handleClose}>Cancel</Label>
          <Button color="teal" type='submit' onClick={this.submitHandler}>Submit</Button>
      </Form>
      <Modal.Description>
          <Header>Default Profile Image</Header>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
  }
}

// <input placeholder='Describe what you need' name='name' value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
// <label>Description</label>

// export default NewEvent
