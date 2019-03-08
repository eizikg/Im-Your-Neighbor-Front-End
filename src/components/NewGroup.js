import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Header, Icon, Modal, Label} from 'semantic-ui-react'

class newGroup extends Component {



  state={
    modalOpen: false,
    name: "",
    descripton: ""
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
    console.log("open")
  }

  handleClose = () => this.setState({ modalOpen: false })

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


   createGroup = (e) => {
     console.log("create group")
     this.props.createGroup({name: this.state.name, descripton: this.state.description})
     // this.handleClose()
     this.setState({ modalOpen: false, name: "", descripton: "" })
  }

render(){
return (
  <Modal
  trigger={<div><br/><br/><Button circular size='big' onClick={this.handleOpen} inverted icon='plus' color='orange' content='Create new group'></Button></div>}
  centered={true}
  open={this.state.modalOpen}
  onClose={this.handleClose}
  size='small'
  >
<Modal.Header>create a new group</Modal.Header>
<Modal.Content image>
  <Form>
    <h3>New Group</h3>
      <Form.Field>
        <label>Neighborehood</label>
        <input placeholder='city or neighborhood' name='name' value={this.state.name} onChange={(e) => this.changeHandler(e)}/>
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input placeholder='Description' name='descripton' value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
      </Form.Field>
      <Button.Group>
        <Button type='submit' onClick={this.handleClose}>Cancel</Button>
        <Button.Or />
        <Button color='teal' btn btn-primary type='submit' onClick={this.createGroup}>Submit</Button>
      </Button.Group>
  </Form>
</Modal.Content>
</Modal>
)}
}

export default newGroup
