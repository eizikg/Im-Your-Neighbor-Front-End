import React, { Component } from 'react';
import Login from '../components/LogIn'
import SignUp from '../components/SignUp'
import { Route, Link, Switch} from "react-router-dom";
import AuthAdapter from '../lib/AuthAdapter'
import PropTypes from 'prop-types'
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
  Visibility,
} from 'semantic-ui-react'

// class Home extends Component{
//
//   render(){
//     console.log("check if user is logged in", this.props.loggedIn)
//     return (
//       <div>
//       <div className="container">
//       <div className="navbar">
//       { !this.props.loggedIn ?
//         <div className="navbar-inner">
//          <button type="button" onClick={() => this.props.history.push('/signup')}>Create An Account</button>
//           <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/login')}>Login</button>
//         </div>
//         :
//         <div className="navbar-inner">
//         <button type="button" className="btn btn-default" onClick={() => this.props.LogOut()}>Log Out</button>
//         <button type="button" className="btn btn-primary" onClick={() => {this.props.HasGroup()}}>Group Page</button>
//         </div>
//       }
//       </div>
//      </div>
//       <div className="container">
//       <div className="row">
//       <img className="img-fluid" src="http://fieldservicenews.com/wp-content/uploads/2016/04/helping-hands-700-700x400.jpg" alt="First slide"/>
//         <div className="banner-text">
//             <h2>Lend a hand to your neighbor</h2>
//             <p>Welcome to your local community. Help a neighbor in need, and you can get help when you need it too.</p>
//         </div>
//     </div>
//     </div>
//     </div>
//   )}
//
//
//
//  }

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = (props, { mobile }) => {

  return (
  <Container id="home-header"
     >
    <Header
      as='h1'
      content="I'm Your Neighbor!"
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'bold',
        textShadow: '0 1px 40px #ffffff',
        marginBottom: 0,
        color: 'grey',
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header

      as='h2'
      content='Lend a hand to a neighbor'
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  <Button primary size='huge' onClick={() => props.signUp()}>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  signUp = () => {
    this.props.history.push('/signup')
  }

  render() {
    console.log("props", this.props)
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            className='home-segment'

            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                {!this.props.loggedIn ?
                <Menu.Item position='right'>
                  <Button secondary as='a'  onClick={() => this.props.history.push('/login')}>
                    Log in
                  </Button>
                  <Button primary as='a' onClick={() => this.props.history.push('/signup')} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              :
              <Menu.Item position='right'>
                <Button as='a' onClick={() => this.props.LogOut()}>
                  Log Out
                </Button>
                <Button as='a' onClick={() => this.props.HasGroup()} primary={fixed} style={{ marginLeft: '0.5em' }}>
                  Member Page
                </Button>
              </Menu.Item>
            }
              </Container>
            </Menu>
            <div id='main'>
            <HomepageHeading signUp={this.signUp}/>
            <style>
              {
                `.home-segment{
                  background-image: url('https://www1.nyc.gov/assets/planning/images/content/pages/plans/east-new-york/dcp_atlantic_warwick.jpg') !important;
                  background-size: cover !important;
                }`
              }
            </style>
            </div>
          </Segment>
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
        <Sidebar
          as={Menu}
          animation='push'
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
            <Header as='h1'>Sorry, this website does not yet support mobile devices. Please visit using a computer. Thanks.</Header>
            <span>We are working on it 😉</span>
            </Container>
            <img src='https://cdn4.iconfinder.com/data/icons/computer-screen-emoji-set/200/Screen_4-512.png'/>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = (props) => {
  console.log("responsive props", props)
  return (
  <div>
    <DesktopContainer loggedIn={props.loggedIn} history={props.history} LogOut={props.LogOut} HasGroup={props.HasGroup}>{props.children}</DesktopContainer>
    <MobileContainer loggedIn={props.loggedIn} history={props.history} LogOut={props.LogOut} HasGroup={props.HasGroup}></MobileContainer>
  </div>
)}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Home = (props) => {
  console.log("props home compoent", props.loggedIn)
  return (
  <ResponsiveContainer  loggedIn={props.loggedIn} LogOut={props.LogOut} HasGroup={props.HasGroup} history={props.history}>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We create unity within your community.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              By You. You can now easily connect and get to know your neighbors, by sharing info, advice and arrange meetups.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Help is now right around the corner.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              For You. It’s easy. Just ask. Your neighbor will be at your doorstep ready to help you. Join your neighborhood group now.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)}
export default Home
