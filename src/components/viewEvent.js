import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import AuthAdapter from '../lib/AuthAdapter'
// import { withRouter } from "react-router-dom"

class ViewEvent extends Component{

  state={
    volounteers: []
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

  updateEvent(){
    AuthAdapter.updateEvent({event_id: this.props.event_id, active: false, group_id: parseInt(this.props.group_id)})
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
    return (
  <Modal trigger={<Button fluid basic color='blue' onClick={() => this.fetchEvent()}>view</Button>} centered={true}>
    <Modal.Header></Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <h2>Memebrs on this event</h2>
        {this.state.volounteers.length > 0 ? this.state.volounteers.map((volounteer)=>
          <div className="row">
          <i className="user icon"></i>
          <p>{`${volounteer.first_name} ${volounteer.last_name}`}</p>
          </div>)
: null}
        <Button href="#" className={this.style()} onClick={(e) => this.joinEvent()}>I'm available to help</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)}
}

export default ViewEvent

// this.state.volounteers.map((volounteer)=> <p>`hello ${volounteer}`</p>)
