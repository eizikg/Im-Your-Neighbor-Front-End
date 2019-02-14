import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'
import Address from '../components/Address.js'
import AuthAdapter from '../lib/AuthAdapter'
import NewGroup from '../components/NewGroup.js'
import {Container, Header, Icon, Grid, Button, Label} from 'semantic-ui-react'

class Groups extends Component {

state={
  groupData: [],
  byLocation: [],
  showGroups: false,
  currentUserGroups: []
}

componentDidMount(){
  this.group()
  AuthAdapter.fetchUser()
  .then(res => res.json())
  .then(data => {
    console.log(data);
    this.setState({
      currentUserGroups: data.groups
    })
  })
  // let user = this.props.user
  // // console.log(this.props.user)
  // if (user.lng){
  //   // debugger
  //   let location = `${user.lat},${user.lng}`
  //   this.getVolounteersLocation({location: location})
  // }
}

componentDidUpdate(prevProps){
  if (this.state.currentUserGroups.length = 0){
  AuthAdapter.fetchUser()
  .then(res => res.json())
  .then(data => {
    console.log(data);
    this.setState({
      currentUserGroups: data.groups
    })
  })
  // console.log(this.props.user)
  // console.log(this.props, prevProps)
  // if (this.state.byLocation.length === 0){
  //   let user = this.props.user
  //   // console.log(this.props.user.lng)
  //   if (user.lng){
  //     // debugger
  //     let location = `${user.lat},${user.lng}`
  //     // console.log(location)
  //     this.getVolounteersLocation({location: location})
    }
  }


 showGroups=()=>{
   let is_open = this.state.showGroups
   this.setState({
     showGroups: !is_open
   })
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
   // console.log("new group created", data)
   let newState= [...this.state.groupData, data]
   this.setState({
     groupData: newState
   })
   this.props.history.push(`/members/${data.id}`)
 })
}

userGroup=[]

// groupdiv=(div) => {
//   return div
// }

// currentUserGroups =()=> {
//   AuthAdapter.fetchUser()
//   .then(res => res.json())
//   .then(data => {
//     this.userGroup=data.groups
//   })
// }

 groupdiv=() => {
   let div =  <div><span>your groups</span> {this.state.currentUserGroups.map((g) => {
     return(
        <div>
          <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>
        </div>
        )
      })
    }
    </div>
    return div
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
  console.log(this.props);
  // console.log("state for if the user has a group already", this.props.has_group)
  return (
    <div>
      <Button add onClick={() => this.props.logOut()}>log out</Button>
    <Container>
        <Header as='h2' icon>
      <Icon name='users' circular />
      <Header.Content>Groups</Header.Content>
      <Header.Subheader>Join existiong groups or create your very own</Header.Subheader>
      <br/>
      <br/>
      <br/>
      <Container>
        <Address
          getVolounteersLocation={this.getVolounteersLocation}
          getGroupsLocation={this.getGroupsLocation}
          groupData={this.state.byLocation}
          user={this.props.user}
          />
        <Label color='teal'>Type in your address and discover groups near you.</Label>
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
      <button onClick={this.showGroups}>all groups</button>
      { this.state.showGroups ?
         this.state.groupData.map((g) =>
         <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>)
           :null
         }
         </div>
     <div className="column">
   </div>
   <div className="column">
     {this.byLocation() }
   </div>
   <div className="column">
     {this.state.currentUserGroups.length > 0 ? this.groupdiv(): null}
   </div>
     </div>

 </Container>
    </div>
  )
}

}

export default Groups
