import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'
// import NewGroup from '../components/newGroup.js'


class settingsPage extends Component {

state={
  groupData: []
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


render (){
  console.log(this.props.has_group)
  if (!this.props.has_group){
  return (
    <div>
      {this.state.groupData.map((g) => <EachGroup JoinGroup={this.props.JoinGroup} groupData={g} key={g.id} user={this.props.user}/>)}
    </div>
  )}
  else {
    return <h1>you already have a group</h1>
  }

}

}

export default settingsPage
