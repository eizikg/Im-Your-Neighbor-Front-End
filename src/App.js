import React from "react";
import { Route, Link, Switch} from "react-router-dom";
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp'
import Home from './containers/Home'
import MemberPage from './containers/MemberPage'
import AuthAdapter from './lib/AuthAdapter'
import Groups from './containers/Groups.js'
import { withRouter } from "react-router-dom"
import Messaging from './containers/Messaging.js'
import MainPageLayout from './containers/mainPageLayout.js'
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';

// import 'semantic-ui-css/semantic.min.css'
// import Settings from './containers/settings.js'

class App extends React.Component {


  state={
    user: {},
    loggedIn: false,
    has_group: false,
    group_data: [],
    groups: [],
    newJoin: false
  }


  LogIn = ({email, password}) => {
    AuthAdapter.checklogin(email, password)
    .then(resp => {
      let json = resp.json()
      // console.log(resp.status);
      if (resp.status === 200){
        return json.then(data =>{
            this.setState({
            loggedIn: true,
            user: data.user
          })
          localStorage.token = data.auth_token
          this.has_group()
        }
        )
      }
      else json.then(alert)
    })
  }

  SignUp = ({first_name, last_name, email, password}) => {
    AuthAdapter.createUser(first_name, last_name, email, password)
    .then(res => {
      if (!res.ok){
        throw Error(res.message)
      }
      return res.json()
    })
    .then(data =>{
       console.log(data)
        this.setState({
        loggedIn: true,
        user: data.user
      })
      localStorage.token = data.auth_token
      this.has_group()
    }
    )
    .catch(error => {
      // alert(error)
      console.error(error)
    })
  }


  LogOut = () => {
    AuthAdapter.logOut()
    this.setState({
      loggedIn: false,
      user: {}
    })
    this.props.history.push(`/`)
  }


//not used in new app
  joinEvent=({group_id, event_id}) => {
    AuthAdapter.joinEvent(group_id, this.state.user.id, event_id)
    .then(res => res.json())
    .then(data => {
      console.log("joined the event", data)
      // window.location.reload();
    })
  }

  JoinGroup = (group_id) => {
    AuthAdapter.joinGroup(this.state.user.id, group_id)
    .then(res => res.json())
    .then(data => {
      console.log("joined the group", data)
      this.setState({newJoin: data.new_join})
      this.props.history.push(`/members/${group_id}`)
    })
  }

  has_group = () => {
    fetch(`http://localhost:3000/api/v1/volounteers/${this.state.user.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      Authorization: localStorage.token}
    })
    .then(res => res.json())
    .then(data => {
      console.log("has group", data)
      // debugger
      let group = data.groups
      if (data.groups.length > 0 ){
        this.setState({
          has_group: true,
          groups: data.groups
        })
        this.props.history.push(`/members/${data.groups[0].id}`)
      }
      else {
        this.props.history.push('/groups')
      }
    })
  }

  componentDidMount(){
   if (localStorage.token){
   AuthAdapter.fetchUser()
   .then(res => res.json())
   .then(data => {
     if (!data.error) {
       console.log("fetching the user", data)
       this.setState({
         user: data,
         loggedIn: true
       })
     }
   })
  }
}

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact path='/'
            render={
              (props) => <Home {...props}
              loggedIn={this.state.loggedIn}
              LogOut={this.LogOut}
              HasGroup={this.has_group}
              />
          }
            />
          <Route path='/login'
            render={(props) => <LogIn {...props} LogIn={this.LogIn}/>}
            />
          <Route path='/signup'
              render={(props) => <SignUp {...props} SignUp={this.SignUp}/>}
              />
            <Route path='/test/:id'
                render={(props) => <MainPageLayout {...props}
                user={this.state.user}
                joinEvent={this.joinEvent}
                logOut={this.LogOut}
                />}
                />
          <Route path='/groups'
            render={(props) => <Groups {...props}
            user={this.state.user}
            JoinGroup={this.JoinGroup}
            has_group={this.state.has_group}
            LogOut={this.LogOut}
            />}
            />
          <Route exact path='/members/:id'
              render={(props) => <MainPageLayout {...props}
              user={this.state.user}
              joinEvent={this.joinEvent}
              logOut={this.LogOut}
              newJoin={this.state.newJoin}
              />}
              />
        </Switch>
      </div>
    )

  }

}

export default withRouter(App);
