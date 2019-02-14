import React, { Component } from 'react';
import AuthAdapter from '../lib/AuthAdapter'
import EventTop from '../components/EventTop'
import NewEvent from '../components/newEvent'
import { Container, Grid, Button, Header, Icon, Modal, Form} from 'semantic-ui-react'
import MembersList from '../components/MembersList'


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
        console.log("fetching the groups", data[0].group_volounteers)
        let members = data[0].group_volounteers.map((volounteer) => {
          return volounteer.volounteer
        })
      this.setState({
        eventData: data[0].events,
        members: members,
        group_info: data[0]
      })
    })
   }
  }

  componentDidMount(prevProps){
    if (this.props.user){
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        console.log("fetching the groups", data[0].group_volounteers)
        let members = data[0].group_volounteers.map((volounteer) => {
          return volounteer.volounteer
        })
      this.setState({
        eventData: data[0].events,
        members: members,
        group_info: data[0]
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
      // console.log("fetch groups",this.state);
      let newState = [...this.state.eventData, data]
      this.setState({
        eventData: newState
      })
    })
  }

  render() {
    console.log("state of member page", this.state)
    return (
    <div>
      <Container>
        {this.state.group_info ?
          <div>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>{this.state.group_info.name}</Header.Content>
        <Header.Subheader>{this.state.group_info.description}</Header.Subheader>
    </Header>
  </div> : null}
      <Button add onClick={() => this.props.logOut()}>log out</Button>
      <Button onClick={() => this.props.history.push(`/groups`)}>Groups</Button>
      <br/>
      <br/>
      <br/>
      <NewEvent
        group_id={this.props.match.params.id}
        newEvent={this.newEvent}
        />
     <br/>
      <hr/>
      </Container>
      <Container>
        <Header textAlign='center'>
          <h1>Events.</h1>
        </Header>
      <EventTop
        eventData={this.state.eventData} group_id={this.props.match.params.id} joinEvent={this.props.joinEvent} user={this.props.user}
        />
    </Container>
      <Container>
      <br/>
      <Grid coloums={2} divided>
        <Grid.Column>
          <Header>Group Members</Header>
      {this.state.members.map((member) => {
        return <MembersList
          member={member}
          />
      })}
    </Grid.Column>
     </Grid>
    </Container>
    </div>
    );
  }

}
// <div className="row">
// </div>
// {this.state.eventData.map(g => <EventTop eventData={g} user={this.props.user} key={g.id} group_id={this.props.match.params.id} joinEvent={this.props.joinEvent}/>)}

export default MemberPage;
