import React, { Component } from 'react'
import { Button, Header, Icon, Dropdown, Modal, Form, Label, TextArea} from 'semantic-ui-react'
import AuthAdapter from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/lib/AuthAdapter.js'
import EventAddress from './EventAddress.js'

export default class NewEvent extends Component {
  state = {
     modalOpen: false,
     description: "",
     time: "",
     value: 1
    }


  changeHandler = (e) => {
    // description = e.target.value
    this.setState({
      [e.target.name]: e.target.value
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

  newEvent = (address) => {
    var stateValues = {description: this.state.description, volounteers_required: this.state.value}
    var allParmas = Object.assign(address, stateValues)
    this.props.newEvent(allParmas)
    this.handleClose()
    this.setState({ description: "" })
  }

 handleChange = (e, { value }) => this.setState({ value })

  render() {
    const inlineStyle = {
      modal : {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignContent: 'center'
      }
    }
    const { value } = this.state
    const options = [
      { key: 1, text: '1', value: 1 },
      { key: 2, text: '2', value: 2 },
      { key: 3, text: '3', value: 3 },
      { key: 4, text: '4', value: 4 },
    ]

    return (
      <Modal
      trigger={<div><Button circular onClick={this.handleOpen} floated='left' inverted icon='plus' color='orange' content='add event'></Button></div>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      centered={true}
      size='small'
      >
    <Modal.Header>Request for help</Modal.Header>
    <Modal.Content>
    <Label content="volounteers required"></Label>
    <Dropdown options={options} value={value} simple item onChange={this.handleChange}/><br/>
      <Form>
        <TextArea name="description" placeholder="Describe your problem" value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
        <TextArea name="time" placeholder="*optional  When?" value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
        <Button onClick={this.handleClose}>Cancel</Button>
      </Form>
      <Modal.Actions>
        <NestedModal
          newEvent={this.newEvent}
          description={this.state.description}
          time={this.state.time}
          />
      </Modal.Actions>
    </Modal.Content>
  </Modal>
    )
  }
}

class NestedModal extends Component {

  state = {
    open: false,
    address: []
   }

  submitAddress = (params) => {
    this.setState({
      address: params
    })
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button float="left" primary icon>
            Next <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Enter the address for the event</Modal.Header>
        <Modal.Content>
          <EventAddress
          submitAddress={this.submitAddress}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
          icon='check'
          type='submit'
          onClick={() => {
            this.props.newEvent(this.state.address)
            this.close()
          }} content='All Done'  />
        </Modal.Actions>
      </Modal>
    )
  }
}
