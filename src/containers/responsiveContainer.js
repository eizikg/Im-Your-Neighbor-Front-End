// import { withRouter } from "react-router";
import React, { Component } from 'react';
import AuthAdapter from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/lib/AuthAdapter.js'
import DesktopContainer from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/containers/mainPageLayout.js'
// import MainPageLayout from '../containers/mainPageLayout'
//import MobileContainer from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/containers/mainPageLayout.js'
import LeftMenu from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/containers/mainPageLayout.js'

class ResponsiveContainer extends Component {

  state={
    eventData: [],
    members: [],
    group: {}
  }

  // componentDidUpdate(prevProps){
  //   if (this.props.match.params.id !== prevProps.match.params.id){
  //     AuthAdapter.fetchGroup(this.props.match.params.id)
  //     .then(res => res.json())
  //     .then(data =>{
  //       console.log("fetching the groups", data[0].group_volounteers)
  //     this.setState({
  //       eventData: data[0].events,
  //       members: data[0].volounteers,
  //       group_info: data[0]
  //     })
  //   })
  //  }
  // }
  //
  // componentDidMount(prevProps){
  //   // setTimeout(() => { this.setState({ loading: false}); }, 3000);
  //   if (this.props.user){
  //     AuthAdapter.fetchGroup(this.props.match.params.id)
  //     .then(res => res.json())
  //     .then(data =>{
  //       console.log("fetching the groups", data[0].group_volounteers)
  //     this.setState({
  //       eventData: data[0].events,
  //       members: data[0].volounteers,
  //       group_info: data[0]
  //     })
  //   })
  //  }
  // }

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
  //
  // <MobileContainer loggedIn={this.props.loggedIn} history={this.props.history} LogOut={this.props.LogOut} HasGroup={this.props.HasGroup}></MobileContainer>

  render (){
  return (
  <div>
  <LeftMenu/>
  </div>
)}
}

export default ResponsiveContainer
