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
  console.log(this.props)
  return (
    <div>
      {this.state.groupData.map((g) => <EachGroup memberRoute={this.props.memberRoute} groupData={g} key={g.id} user={this.props.user}/>)}
    </div>
  )

}

}

export default settingsPage
