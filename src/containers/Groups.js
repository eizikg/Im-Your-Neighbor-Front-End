import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'
import Address from '../components/Address.js'
import AuthAdapter from '../lib/AuthAdapter'
import NewGroup from '../components/NewGroup.js'
import {Container, Header, Icon, Grid} from 'semantic-ui-react'

class Groups extends Component {

state={
  groupData: [],
  byLocation: []
}

componentDidMount(){
  this.group()
  let user = this.props.user
  console.log(this.props.user)
  if (user.lng){
    debugger
    let location = `${user.lat},${user.lng}`
    this.getVolounteersLocation({location: location})
  }
}

componentDidUpdate(prevProps){
  console.log(this.props.user)
  console.log(this.props, prevProps)
  if (this.state.byLocation.length === 0){
    let user = this.props.user
    console.log(this.props.user.lng)
    if (user.lng){
      debugger
      let location = `${user.lat},${user.lng}`
      console.log(location)
      this.getVolounteersLocation({location: location})
    }
  }
}

group = ()=>{
  fetch('http://localhost:3000/api/v1/groups')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    this.setState({
      groupData: data
    })
  })
}

getGroupsLocation =({location}) => {
  console.log(location)
  AuthAdapter.getGroupsLocation(location, 30)
  .then(res => res.json())
  .then(console.log)
}

getVolounteersLocation=({location}) =>{
  AuthAdapter.getGroupsLocation(location, 30, this.props.user)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if (data.length > 0){
    this.setState({
      byLocation: data
    })
  }
  })
}

newGroup = ({name, description}) => {
  AuthAdapter.createGroup(name, description, this.props.user)
 .then(res => res.json())
 .then(data => {
   console.log("new group created", data)
   let newState= [...this.state.groupData, data]
   this.setState({
     groupData: newState
   })
 })
}

byLocation = () => {
  if (this.state.byLocation.length > 0){
     let div =  <div><span>near you</span> {this.state.byLocation.map((g) =>{
      return (<div><EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/></div>)
    })
  }
</div>
    return div
}
  else{
    return false
  }
}


render (){
  console.log("state for if the user has a group already", this.props.has_group)
  return (
    <div>
    <Container>
        <Header as='h2' icon>
      <Icon name='users' circular />
      <Header.Content>Welcome! please find your group.</Header.Content>
      <Header.Subheader>Join existiong groups or create your very own</Header.Subheader>
      <br/>
      <Container>
        <Address
          getVolounteersLocation={this.getVolounteersLocation}
          getGroupsLocation={this.getGroupsLocation}
          groupData={this.state.byLocation}
          user={this.props.user}
          />
      </Container>
      <Grid.Row>
        <NewGroup
          user={this.props.user}
          createGroup={this.newGroup}
          />
      </Grid.Row>
    </Header>
  </Container>
  <hr/>
    <Container>
    <div className="ui three column page grid">
      <hr/>
    <div className="column">
      <span>all groups</span>
      {this.state.groupData.map((g) =>
         <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>)}
         </div>
     <div className="column">
     {this.byLocation()}
   </div>
   <div className="column">
   </div>
   <div className="column">
   </div>
     </div>

 </Container>
    </div>
  )
}

}

export default Groups
