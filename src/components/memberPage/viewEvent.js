import React, { Component } from 'react';
import { Button, Header, Image, Modal, Checkbox } from 'semantic-ui-react'
import AuthAdapter from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/lib/AuthAdapter.js'

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

    const inlineStyle = {
      modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignContent: 'center'
    }
  };
    return (
  <Modal trigger={<Button fluid basic color='blue' onClick={() => this.fetchEvent()}>view</Button>} centered={true} style={inlineStyle.modal}>
    <Modal.Header></Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image test</Header>
        <h2>Memebrs on this event</h2>
        {this.state.volounteers.length > 0 ? this.state.volounteers.map((volounteer)=>
          <div className="row">
          <i className="user icon"></i>
          <p>{`${volounteer.first_name} ${volounteer.last_name}`}</p>
          </div>)
: null}
        <Button href="#" className={this.style()} onClick={(e) => this.joinEvent(this.props.event_id)}>I'm available to help</Button>
      </Modal.Description>
    </Modal.Content>
    <Modal.Content>
      <Checkbox toggle />
      </Modal.Content>
  </Modal>
)}
}

export default ViewEvent

// this.state.volounteers.map((volounteer)=> <p>`hello ${volounteer}`</p>)
