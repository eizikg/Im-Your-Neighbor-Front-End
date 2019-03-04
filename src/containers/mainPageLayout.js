import React, { Component } from 'react';
import Login from '../components/LogIn'
import SignUp from '../components/SignUp'
import { Route, Link, Switch} from "react-router-dom";
import AuthAdapter from '../lib/AuthAdapter'
import PropTypes from 'prop-types'
import EventTop from '../components/EventTop'
import HelpImage from '../lib/home_help.png'
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
class HomepageHeading extends Component{

  render(){
  const { activeItem } = this.state || {}
  const { mobile } = this.props
  return(
    <div>
     <Header
       as='h1'
       inverted
       content='Neighborehood Community'
       style={{
         fontSize: mobile ? '2em' : '4em',
         fontWeight: 'normal',
         marginBottom: 0,
         marginTop: mobile ? '1.5em' : '3em',
       }}
     />
     <Header
       inverted
       as='h2'
       content='Lend a hand to a neighbor'
       style={{
         fontSize: mobile ? '1.5em' : '1.7em',
         fontWeight: 'normal',
         marginTop: mobile ? '0.5em' : '1.5em',
       }}
     />
     </div>
)}}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  render() {

    const { children } = this.props
    const { fixed } = this.state
    const { activeItem } = this.state || {}

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Grid>
          <Grid.Column width={4}>
          <Menu id="menu" vertical style={{ minHeight: 1000}}>
          <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
          <Menu.Item
          name='enterprise'
          active={activeItem === 'enterprise'}
          onClick={this.handleItemClick}
          />
          <Menu.Item
          name='consumer'
          active={activeItem === 'consumer'}
          onClick={this.handleItemClick}
          />
          </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>

          <Menu.Menu>
          <Menu.Item
          name='rails'
          active={activeItem === 'rails'}
          onClick={this.handleItemClick}
          />
          <Menu.Item
          name='python'
          active={activeItem === 'python'}
          onClick={this.handleItemClick}
          />
          <Menu.Item
          name='php'
          active={activeItem === 'php'}
          onClick={this.handleItemClick}
          />
          </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
          <Menu.Header>Hosting</Menu.Header>

          <Menu.Menu>
          <Menu.Item
          name='shared'
          active={this.activeItem === 'shared'}
          onClick={this.handleItemClick}
          />
          <Menu.Item
          name='dedicated'
          active={this.activeItem === 'dedicated'}
          onClick={this.handleItemClick}
          />
          </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
          <Menu.Item
          name='email'
          active={this.activeItem === 'email'}
          onClick={this.handleItemClick}
          >
          E-mail Support
          </Menu.Item>

          <Menu.Item
          name='faq'
          active={this.activeItem === 'faq'}
          onClick={this.handleItemClick}
          >
          FAQs
          </Menu.Item>
          </Menu.Menu>
          </Menu.Item>
          </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
          <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 400, padding: '1em 0em' }}
              vertical
            >
          <HomepageHeading />
          </Segment>
          </Grid.Column>
          </Grid>


        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
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
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading mobile />
          </Segment>
          {children}
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

class ResponsiveContainer extends Component {

  state={
    eventData: [],
    members: [],
    group: {}
  }

  componentDidUpdate(prevProps){
    // setTimeout(() => { this.setState({ loading: false}); }, 1000);
    if (this.props.user.id !== prevProps.user.id  && this.props.user){
    // console.log(this.props, this.props.match.params.id)
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        console.log("fetching the groups", data[0].group_volounteers)
      this.setState({
        eventData: data[0].events,
        members: data[0].volounteers,
        group_info: data[0]
      })
    })
   }
  }

  componentDidMount(prevProps){
    // setTimeout(() => { this.setState({ loading: false}); }, 3000);
    if (this.props.user){
      AuthAdapter.fetchGroup(this.props.match.params.id)
      .then(res => res.json())
      .then(data =>{
        console.log("fetching the groups", data[0].group_volounteers)
      this.setState({
        eventData: data[0].events,
        members: data[0].volounteers,
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

  render (){
  return (
  <div>
    <DesktopContainer loggedIn={this.props.loggedIn} history={this.props.history} LogOut={this.props.LogOut} HasGroup={this.props.HasGroup} user={this.props.user}>{this.props.children}</DesktopContainer>
    <MobileContainer loggedIn={this.props.loggedIn} history={this.props.history} LogOut={this.props.LogOut} HasGroup={this.props.HasGroup}></MobileContainer>
  </div>
)}
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
  LogOut={this.props.LogOut}
  HasGroup={this.props.HasGroup}
  user={this.props.user}
  />
)}
}
export default MainPageLayout
