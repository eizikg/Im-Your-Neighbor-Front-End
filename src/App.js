import React from "react";
import { Route, Link, Switch} from "react-router-dom";
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp'
import Home from './containers/Home'
import MemberPage from './containers/MemberPage'
import AuthAdapter from './lib/AuthAdapter'
import Groups from './containers/Groups.js'
import { withRouter } from "react-router-dom"
// import Settings from './containers/settings.js'

class App extends React.Component {


  state={
    user: {},
    loggedIn: false,
    has_group: false,
    group_data: []
  }

  LogIn = ({email, password}) => {
    AuthAdapter.checklogin(email, password)
    .then(resp => {
      let json = resp.json()
      // console.log(resp.status);
      if (resp.status === 200){
        return json.then(data =>{
            console.log("login fetch return:", data)
            this.setState({
            loggedIn: true,
            user: data.user
          })
          localStorage.token = data.auth_token
          this.has_group()
        }
        )
      }
      else json.then(alert("invalid username or password"))
    })
  }

  SignUp = ({first_name, last_name, email, password}) => {
    // console.log(first_name, last_name, email, password)
    AuthAdapter.createUser(first_name, last_name, email, password)
    .then(res => res.json())
    .then(data =>{
        console.log("created the user", data)
        this.setState({
        loggedIn: true,
        user: data.user
      })
      localStorage.token = data.auth_token
      this.has_group()
    }
    )
  }


  LogOut = () => {
    AuthAdapter.logOut()
    this.setState({
      loggedIn: false,
      user: {}
    })
    this.props.history.push(`/`)
  }

  joinEvent=({group_id, event_id}) => {
    AuthAdapter.joinEvent(group_id, this.state.user.id, event_id)
    .then(res => res.json())
    .then(data => console.log("joined the event", data))
  }

  JoinGroup = (group_id) => {
    console.log(group_id)
    AuthAdapter.joinGroup(this.state.user.id, group_id)
    .then(res => res.json())
    .then(data => {
      console.log("joined the group", data)
      this.props.history.push(`/members/${group_id}`)
    })
  }

  has_group = () => {
    // console.log(this.state.user.id)
    // console.log(this.props)
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
          has_group: true
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
       // this.has_group()
     }
     // else {
     //   alert('incorrect username or password')
     // }
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
          <Route path='/groups'
            render={(props) => <Groups {...props}
            user={this.state.user}
            JoinGroup={this.JoinGroup}
            has_group={this.state.has_group}
            />}
            />
          <Route exact path='/members/:id'
              render={(props) => <MemberPage {...props}
              group={this.state.group_data}
              user={this.state.user}
              joinEvent={this.joinEvent}
              logOut={this.LogOut}
              />}
              />
        </Switch>
      </div>
    )

  }

}

export default App;
