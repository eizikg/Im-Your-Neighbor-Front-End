import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'
import Address from '../components/Address.js'
import AuthAdapter from '../lib/AuthAdapter'
// import NewGroup from '../components/newGroup.js'


class Groups extends Component {

state={
  groupData: [],
  byLocation: []
}

componentDidMount(){
  this.group()
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
  AuthAdapter.getVolounteersLocation(location, 30)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    this.setState({
      byLocation: data
    })
  })
}

byLocation = () => {
  if (this.state.byLocation.length > 0){
    return this.state.byLocation.map((g) =>{
      return <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>
    })
}
  else{
    return false
  }
}


render (){
  console.log("state for if the user has a group already", this.props.has_group)
  return (
    <div>
      <h4>find people or groups near you</h4>
      <Address
        getVolounteersLocation={this.getVolounteersLocation}
        getGroupsLocation={this.getGroupsLocation}
        groupData={this.state.byLocation}
        />
      <hr/>
      <br/>
      <span>all groups</span>
      {this.state.groupData.map((g) =>
         <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>)}
      <span>near you</span>
      {this.byLocation()}
    </div>
  )
}

}

export default Groups
