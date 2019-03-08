import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'
import Address from '../components/Address.js'
import AuthAdapter from '../lib/AuthAdapter'
import NewGroup from '../components/NewGroup.js'
import {Container, Header, Segment, Icon, Menu, Grid, Button, Label, Card} from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import { CSSTransitionGroup } from 'react-transition-group'
// import Messaging from './Messaging.js'

class Groups extends Component {

state={
  groupData: [],
  byLocation: [],
  currentUserGroups: [],
  hasAddress: false,
  activeItem: "Near You"
}

componentDidMount(){
  fetch('http://localhost:3000/api/v1/groups')
  .then(res => res.json())
  .then(data => {
    this.setState({
      groupData: data
    })
  })
}

getVolounteersLocation=(params) =>{
  AuthAdapter.getGroupsLocation(params)
  .then(res => res.json())
  .then(data => {
    console.log(this.props.user)
    if (data.length > 0){
    this.setState({
      byLocation: data,
      hasAddress: true
    })
  }
  })
}

newGroup = ({name, description}) => {
  AuthAdapter.createGroup(name, description, this.props.user)
 .then(res => res.json())
 .then(data => {
   // console.log("new group created", data)
   let newState= [...this.state.groupData, data]
   this.setState({
     groupData: newState
   })
   this.props.history.push(`/members/${data.id}`)
 })
}

 handleItemClick = (e, { name }) => {
   this.setState({activeItem: name})
 }



groups = () => {
  let {activeItem} = this.state
  switch(activeItem) {
    case "All Groups":
      let groups = this.state.groupData.map((g) =>{
        return (<div><EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.last_name} user={this.props.user} owner={false}/></div>)
      })
      return(<Card.Group>{groups}</Card.Group>)
    break;
    case "Near You":
      if (this.state.byLocation.length > 0){
        let groups = this.state.byLocation.map((g) =>{
          return (<div><EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.last_name} user={this.props.user} owner={false}/></div>)
        })
        return(<Card.Group>{groups}</Card.Group>)
      }
    break;
    case "Your Groups":
      if (this.props.user.groups.length > 0){
        let groups = this.props.user.groups.map((g) =>{
          return (<div><EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.last_name} user={this.props.user} owner={true}/></div>)
        })
        return(<Card.Group>{groups}</Card.Group>)
      }
    }
  }


render (){
  const { activeItem } = this.state
  console.log(this.props)

  if (this.state.hasAddress){
  return (
    <div>
      <NewGroup user={this.props.user} createGroup={this.newGroup}/>
        <CSSTransitionGroup
          transitionName="groups"
          transitionEnterTimeout={2000}
          transitionLeave={false}
          transitionAppear={true}
          transitionAppearTimeout={2000}
          >
      <Grid centered>
        <Grid.Row>
          <Container style={{alignItems: 'center', justifyContent: 'center'}}>
            <br/>
            <Header icon style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='users' circular />
              <Header.Content content='groups'/>
              <Header.Subheader content='Join existiong groups or create your very own'/>
            </Header>
            <Address
              getVolounteersLocation={this.getVolounteersLocation}
              getGroupsLocation={this.getGroupsLocation}
              groupData={this.state.byLocation}
              user={this.props.user}
              />
          </Container>
        </Grid.Row>
        <hr/>
        <Grid.Row width={16}>
          <Menu pointing secondary>
          <Menu.Item name='Near You' active={activeItem === 'Near You'} onClick={this.handleItemClick} />
          <Menu.Item
            name='All Groups'
            active={activeItem === 'All Groups'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Your Groups'
            active={activeItem === 'Your Groups'}
            onClick={this.handleItemClick}
          />
        </Menu>
        </Grid.Row>
        <Grid.Row width={10}>
          {this.groups() }
        </Grid.Row>
      </Grid>
    </CSSTransitionGroup>
    </div>
    )}
  else {
    return (
      <CSSTransitionGroup
        transitionName="groups"
        transitionLeave={true}
        transitionAppear={false}
        transitionEnter={false}
        transitionLeaveTimeout={1000}
        >
      <Grid id='group' centered >
        <style>
          {
           `#group{
             align-items: center;
             justify-content: center;
           }
           `
          }
        </style>
        <Container as='h1' style={{alignItems: 'center', justifyContent: 'center'}}>
          <br/>
        <Header icon style={{alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='users' circular />
        <Header.Content content='groups'/>
        <Header.Subheader content='Join existiong groups or create your very own'/>
        </Header>
          <Address
            getVolounteersLocation={this.getVolounteersLocation}
            getGroupsLocation={this.getGroupsLocation}
            groupData={this.state.byLocation}
            user={this.props.user}
            />
            <Label color='teal' content='Type in your address and discover groups near you.' />
        </Container>
        </Grid>
      </CSSTransitionGroup>
    )
  }
}

}

export default withRouter(Groups)
