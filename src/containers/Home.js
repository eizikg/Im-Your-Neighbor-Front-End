import React, { Component } from 'react';
import Login from '../components/LogIn'
import SignUp from '../components/SignUp'
import { Route, Link, Switch} from "react-router-dom";
import AuthAdapter from '../lib/AuthAdapter'

class Home extends Component{

  render(){
    console.log("check if user is logged in", this.props.loggedIn)
    return (
      <div>
      <div className="container">
      <div className="navbar">
      { !this.props.loggedIn ?
        <div className="navbar-inner">
         <button type="button" onClick={() => this.props.history.push('/signup')}>Create An Account</button>
          <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/login')}>Login</button>
        </div>
        :
        <div className="navbar-inner">
        <button type="button" className="btn btn-default" onClick={() => this.props.LogOut()}>Log Out</button>
        <button type="button" className="btn btn-primary" onClick={() => {this.props.HasGroup()}}>Group Page</button>
        </div>
      }
      </div>
     </div>
      <div className="container">
      <div className="row">
      <img className="img-fluid" src="http://fieldservicenews.com/wp-content/uploads/2016/04/helping-hands-700-700x400.jpg" alt="First slide"/>
        <div className="banner-text">
            <h2>Lend a hand to your neighbor</h2>
            <p>Welcome to your local community. Help a neighbor in need, and you can get help when you need it too.</p>
        </div>
    </div>
    </div>
    </div>
  )}



 }

export default Home
