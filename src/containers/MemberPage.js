import React, { Component } from 'react';
import AuthAdapter from '../lib/AuthAdapter'
import EventTop from '../components/EventTop'
import NewEvent from '../components/newEvent'
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react'

class MemberPage extends Component {

  state={
    eventData: [],
    members: []
  }

  componentDidUpdate(prevProps){
    if (this.props.user.id !== prevProps.user.id  && this.props.user){
    // console.log(this.props, this.props.match.params.id)
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        // console.log(data)
        let members = data[0].group_volounteers.map((volounteer) => {
          return volounteer.volounteer
        })
      this.setState({
        eventData: data[0].events,
        members: members
      })
    })
   }
  }

  componentDidMount(prevProps){
    if (this.props.user){
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        // console.log(data)
      this.setState({
        eventData: data[0].events,
        members: data[0].volounteers
      })
    })
   }
  }

  newEvent = (description) => {
    //can't access props here
    AuthAdapter.newEvent(this.props.match.params.id, description)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(this.state);
      let newState = [...this.state.eventData, data]
      this.setState({
        eventData: newState
      })
    })
  }

  render() {
    console.log("state of member page", this.state)
    return (
    <div className="container">
      <div className="row">
      <NewEvent
        group_id={this.props.match.params.id}
        newEvent={this.newEvent}
        />
      <Button onClick={() => this.props.logOut()}>log out</Button>
      </div>
      <div className="row">
        {this.state.eventData.map(g => <EventTop eventData={g} user={this.props.user} key={g.id} group_id={this.props.match.params.id} joinEvent={this.props.joinEvent}/>)}
     </div>
    </div>
    );
  }

}

export default MemberPage;
