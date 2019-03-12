import React, { Component } from 'react';
import { Button, Header, Image, Modal, Checkbox, Grid, List} from 'semantic-ui-react'
import AuthAdapter from '../../lib/AuthAdapter.js'

class ViewEvent extends Component{

  state={
    volounteers: [],
    active: true
  }


  fetchEvent(){
    AuthAdapter.fetchEvent(this.props.event_id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        volounteers: data.volounteers
      })
    })
  }

  joinEvent= ()=> {
      let newState = [...this.state.volounteers, this.props.user]
      this.setState({
        volounteers: newState
      })
      this.props.joinEvent(this.props.event_id)
    }

  style = () => {
    let match = this.state.volounteers.find((volounteer) => {
      return volounteer.id === this.props.user.id
    })
    if (match){
      return 'btn btn-primary disabled'
    }
    else {
      return 'btn btn-primary'
    }
  }

  render() {
    let { eventData } = this.props
    let volounteerList = this.state.volounteers.map((volounteer) => {
      console.log(volounteer)
      return (
      <List.Item>
        <List.Content>{`${volounteer.first_name} ${volounteer.last_name}`}</List.Content>
      </List.Item>
      )

    })

    const inlineStyle = {
      modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignContent: 'center'
    }
  };
  let { active } = this.state
    return (
  <Modal trigger={<Button fluid circular onClick={() => this.fetchEvent()}>Details</Button>} centered={true} style={inlineStyle.modal}>
    <Modal.Header>{eventData.description}</Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <Button href="#" className={this.style()} onClick={(e) => this.joinEvent(this.props.event_id)}>I'm attending</Button>
        {this.state.volounteers.length > 0 ? <List ordered><List.Header>People on this event:</List.Header><br/>{volounteerList}</List> : null}
      </Modal.Description>
    </Modal.Content>
    <Modal.Content>
      <Checkbox toggle label={"Mark as inactive"} defaultChecked={active} onChange={() => this.props.updateEvent(this.props.event_id)}/>
      </Modal.Content>
  </Modal>
)}
}

export default ViewEvent
