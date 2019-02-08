import React from "react";
import { Route, Link, Switch} from "react-router-dom";
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp'
import Home from './containers/Home'
import MemberPage from './containers/MemberPage'
import AuthAdapter from './lib/AuthAdapter'
import Groups from './containers/Groups.js'
import { withRouter } from "react-router-dom"

class App extends React.Component {


  state={
    user: {},
    loggedIn: false,
    has_group: false,
    group_data: []
  }

  LogIn = ({email, password}) => {
    AuthAdapter.checklogin(email, password)
    .then(res => res.json())
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
  }

  SignUp = ({first_name, last_name, email, password}) => {
    console.log(first_name, last_name, email, password)
    AuthAdapter.createUser(first_name, last_name, email, password)
    .then(res => res.json())
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
  }


  LogOut = () => {
    AuthAdapter.logOut()
    this.setState({
      loggedIn: false,
      user: {}
    })
  }

  JoinGroup = (group_id) => {
    this.props.history.push('/member_page/:group_id')
  }

  has_group = () => {
    console.log(this.state.user.id)
    console.log(this.props)
    fetch(`http://localhost:3000/api/v1/volounteers/${this.state.user.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      Authorization: localStorage.token}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // debugger
      let group = data.groups
      if (data.groups.length > 0 ){
        this.setState({
          has_group: true
        })
        this.props.history.push('/member_page/:id')
      }
      else {
        this.props.history.push('/groups')
      }
    })
  }

  componentWillMount(){
   if (localStorage.token){
   AuthAdapter.fetchUser()
   .then(res => res.json())
   .then(data => {
     console.log(data)
     if (!data.error) {
       this.setState({
         user: data,
         loggedIn: true
       })

     }
     else {
       alert('incorrect username or password')
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
          <Route path='/groups'
            render={(props) => <Groups {...props}
            user={this.state.user}
            JoinGroup={this.JoinGroup}
            />}
            />
          <Route path='/member_page'
              render={(props) => <MemberPage {...props}
              group_data={this.state.group_data}
              user={this.state.user}
              />}
              />
        </Switch>
      </div>
    )

  }

}

export default App;
