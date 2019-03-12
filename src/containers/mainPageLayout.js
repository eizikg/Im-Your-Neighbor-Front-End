import React, { Component } from 'react';
import Login from '../components/LogIn'
import SignUp from '../components/SignUp'
import { Route, Link, Switch} from "react-router-dom";
import AuthAdapter from '../lib/AuthAdapter.js'
import PropTypes from 'prop-types'
import { withRouter } from "react-router";
import EventTop from '../components/memberPage/EventTop.js'
import Messaging from './Messaging.js'
import LeftMenu from '../components/memberPage/LeftMenu.js'
// import ResponsiveContainer from './responsiveContainer.js'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Ref,
  Visibility
} from 'semantic-ui-react'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

 class HomepageHeading extends Component{



   render(){
       const { activeItem } = this.state || {}
       const { mobile } = this.props
       console.log(this.props)
       return(
         <div>
          </div>
     )
   }
 }

export class DesktopContainer extends Component {
  state = {}

  render() {
   console.log("desktop container props", this.props)
    const { children } = this.props
    const { fixed } = this.state
    const getWidth = () => {
      const isSSR = typeof window === 'undefined'

      return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Grid>
          <Grid.Column width={3}>
            <LeftMenu members={this.props.members} eventData={this.props.eventData} groupData={this.props.groupData} user={this.props.user} logOut={this.props.logOut}/>
          </Grid.Column>
          <Grid.Column centered width={12}>
            <Grid.Row width={8} style={{minHeight: '400px'}}>
              <EventTop
                eventData={this.props.eventData}
                user={this.props.user}
                />
            </Grid.Row>
            <Grid.Column centered width={12}>
            <Grid.Row width={8}>
              <Messaging newJoin={this.props.newJoin} groupData={this.props.groupData} user={this.props.user}/>
            </Grid.Row>
          </Grid.Column>
          </Grid.Column>
          </Grid>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
          as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
          <Segment

            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
          <Header>Sorry this website does not support mobile devices. Please vist using a computer. Thanks</Header>
          </Segment>
          {children}
      </Responsive>
    )
  }
}

export class ResponsiveContainer extends Component {

  state={
    eventData: [],
    members: [],
    groupData: [],
    user: {}
  }

  // componentDidMount(){
  //     AuthAdapter.fetchGroup(this.props.match.params.id)
  //     .then(res => res.json())
  //     .then(data =>{
  //       console.log("fetching the groups", data)
  //     this.setState({
  //       eventData: data[0].events,
  //       members: data[0].volounteers,
  //       groupData: data[0],
  //       params: this.props.match.params.id
  //     })
  //   })
  // }
  componentDidMount(){
    console.log("props inresponsive for mount", this.props.user)
    if (this.props.user) {
     AuthAdapter.fetchGroup(this.props.match.params.id)
     .then(res => res.json())
     .then(data => {
       this.setState({
         user: this.props.user,
         params: this.props.match,
         eventData: data[0].events,
         members: data[0].volounteers,
         groupData: data[0]
       })
     })
   }
   }


   componentDidUpdate(prevProps){
     console.log("props inresponsive for update", this.props)
    if (this.props.user !== prevProps.user || prevProps.match !== this.props.match){
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: this.props.user,
          params: this.props.match,
          eventData: data[0].events,
          members: data[0].volounteers,
          groupData: data[0]
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
      let { eventData } = this.state
      eventData.unshift(data)
      this.setState({
        eventData: eventData
      })
    })
  }

  render (){
    console.log("responsive state", this.state)
  return (
  <div>
    <DesktopContainer members={this.state.members} newJoin={this.props.newJoin} params={this.state.params} eventData={this.state.eventData} groupData={this.state.groupData} loggedIn={this.props.loggedIn} history={this.props.history} logOut={this.props.logOut} HasGroup={this.props.HasGroup} user={this.state.user}>{this.props.children}</DesktopContainer>
    <MobileContainer members={this.state.members} eventData={this.state.eventData} groupData={this.state.groupData}loggedIn={this.props.loggedIn} history={this.props.history} LogOut={this.props.LogOut} HasGroup={this.props.HasGroup}></MobileContainer>
  </div>
)}
}


MobileContainer.propTypes = {
  children: PropTypes.node,
}


ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class MainPageLayout extends Component{


  render (){
  return (
  <ResponsiveContainer
  loggedIn={this.props.loggedIn}
  history={this.props.history}
  match={this.props.match}
  logOut={this.props.logOut}
  HasGroup={this.props.HasGroup}
  user={this.props.user}
  newJoin={this.props.newJoin}
  />
)}
}
export default withRouter(MainPageLayout)
// export {MobileContainer, DesktopContainer}
