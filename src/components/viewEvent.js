import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import AuthAdapter from '../lib/AuthAdapter'

class ViewEvent extends Component{

  state={
    volounteers: []
  }


  fetchEvent(){
    console.log("props for model", this.props)
    AuthAdapter.fetchEvent(this.props.event_id)
    .then(res => res.json())
    .then(data => {
      console.log("event fetch",data)
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
      this.props.joinEvent()
    }

  style = () => {
    let match = this.state.volounteers.find((volounteer) => {
      return volounteer.id === this.props.user.id
    })
    console.log(!!match)
    if (match){
      return 'btn btn-primary disabled'
    }
    else {
      return 'btn btn-primary'
    }
  }

  render() {
    console.log("volounteers is state:", this.state.volounteers)
    console.log(this.style());
    return (
  <Modal trigger={<Button onClick={() => this.fetchEvent()}>view</Button>} centered={false}>
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
: console.log("no")}
        <Button href="#" className={this.style()} onClick={(e) => this.joinEvent()}>Join event</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)}
}

export default ViewEvent

// this.state.volounteers.map((volounteer)=> <p>`hello ${volounteer}`</p>)