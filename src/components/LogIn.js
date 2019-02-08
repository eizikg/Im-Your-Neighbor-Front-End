import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../App.js'
import AuthAdapter from '../lib/AuthAdapter'

class LogIn extends Component {


  state={
    email: "",
    password: ""
  }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props.LogIn)
    return (
      <div>
      <div>
          <div className="container">
          <br/>
          <hr/>

          <div className="row">
            <aside className="col-sm-3"/>
          <div className="card">
          <article className="card-body">
          <button className="float-right btn btn-outline-primary" onClick={() => this.props.history.push('/signup')}>sign up</button>
          <h4 className="card-title mb-10 mt-4">Sign in</h4>
             <form>
              <div className="form-group">
                <label>Your email</label>
                  <input name="email" value={this.state.email} onChange={(e) => this.changeHandler(e)} className="form-control" id="email" placeholder="Email" type="email"/>
              </div>
              <div className="form-group">
                <button className="float-right" >Forgot?</button>
                <label>Your password</label>
                  <input name="password" value={this.state.password} className="form-control" id="password" placeholder="******" type="password" onChange={(e) => this.changeHandler(e)}/>
              </div>
              <div className="form-group">
              </div>
              <div className="form-group">
                  <button onClick={() => this.props.LogIn(this.state)} className="btn btn-primary btn-block"> Login  </button>
              </div>
          </form>
          </article>
          </div>
          </div>
          </div>
      </div>
      <Link to="/signup">create an account</Link>
      </div>
    );
  }

}

export default LogIn;
