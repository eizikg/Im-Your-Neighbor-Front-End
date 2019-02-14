import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogIn from './LogIn.js'

class SignUP extends Component {

  state={
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <div className="container">
      <div className="row centered-form">
      <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
        <div className="panel panel-default">
          <div className="panel-heading">
          <button className="float-right btn btn-outline-primary" onClick={() => this.props.history.push('/login')}>login</button>
            <h3 className="panel-title">Please sign up for Commuinty Volounteers <small>It's free!</small></h3>
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input type="text" onChange={(e) => this.changeHandler(e)} name="first_name" id="first_name" value={this.state.first_name} className="form-control input-sm" placeholder="First Name"/>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input type="text" name="last_name" onChange={(e) => this.changeHandler(e)} value={this.state.last_name} id="last_name" className="form-control input-sm" placeholder="Last Name"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <input type="email" onChange={(e) => this.changeHandler(e)} name="email" id="email" value={this.state.email} className="form-control input-sm" placeholder="Email Address"/>
              </div>

              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input onChange={(e) => this.changeHandler(e)} type="password" name="password" id="password" value={this.state.password} className="form-control input-sm" placeholder="Password"/>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-block" onClick={() => this.props.SignUp(this.state)} > Get Started  </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    );
  }

}

export default SignUP;
