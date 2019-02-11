import React, { Component } from 'react';
import AuthAdapter from '../lib/AuthAdapter'
import EventTop from '../components/EventTop'

class MemberPage extends Component {

  state={
    eventData: [],
    members: []
  }

  componentDidUpdate(prevProps){
    if (this.props.user.id !== prevProps.user.id  && this.props.user){
    console.log(this.props, this.props.match.params.id)
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
      this.setState({
        eventData: data[0].events,
        members: data[0].volounteers
      })
    })
   }
  }

  componentDidMount(prevProps){
    if (this.props.user){
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
      this.setState({
        eventData: data[0].events,
        members: data[0].volounteers
      })
    })
   }
  }

  render() {
    console.log(this.props)
    return (
    <div className="container">
      <div className="row">
        {this.state.eventData.map(g => <EventTop groupData={g} key={g.id} joinEvent={this.joinEvent}/>)}
     </div>
    </div>
    );
  }

}

export default MemberPage;
