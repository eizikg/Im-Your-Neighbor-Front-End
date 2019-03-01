
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import LogIn from './LogIn.js'
//
// class SignUP extends Component {
//
//   state={
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: ""
//   }
//
//   changeHandler = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }
//
//   render() {
//     console.log(this.state)
//     return (
//       <div>
//       <div className="container">
//       <div className="row centered-form">
//       <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
//         <div className="panel panel-default">
//           <div className="panel-heading">
//           <button className="float-right btn btn-outline-primary" onClick={() => this.props.history.push('/login')}>login</button>
//             <h3 className="panel-title">Please sign up for Commuinty Volounteers <small>It's free!</small></h3>
//           </div>
//           <div className="panel-body">
//             <form role="form">
//               <div className="row">
//                 <div className="col-xs-6 col-sm-6 col-md-6">
//                   <div className="form-group">
//                     <input type="text" onChange={(e) => this.changeHandler(e)} name="first_name" id="first_name" value={this.state.first_name} className="form-control input-sm" placeholder="First Name"/>
//                   </div>
//                 </div>
//                 <div className="col-xs-6 col-sm-6 col-md-6">
//                   <div className="form-group">
//                     <input type="text" name="last_name" onChange={(e) => this.changeHandler(e)} value={this.state.last_name} id="last_name" className="form-control input-sm" placeholder="Last Name"/>
//                   </div>
//                 </div>
//               </div>
//
//               <div className="form-group">
//                 <input type="email" onChange={(e) => this.changeHandler(e)} name="email" id="email" value={this.state.email} className="form-control input-sm" placeholder="Email Address"/>
//               </div>
//
//               <div className="row">
//                 <div className="col-xs-6 col-sm-6 col-md-6">
//                   <div className="form-group">
//                     <input onChange={(e) => this.changeHandler(e)} type="password" name="password" id="password" value={this.state.password} className="form-control input-sm" placeholder="Password"/>
//                   </div>
//                 </div>
//               </div>
//
//               <button className="btn btn-primary btn-block" onClick={() => this.props.SignUp(this.state)} > Get Started  </button>
//
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//     </div>
//     );
//   }
//
// }
//
// export default SignUP;

import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Label} from 'semantic-ui-react'

class SignUp extends Component {

  state={
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    error: false
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    var {first_name, last_name, email, password} = this.state
    if (first_name && last_name && email && password){
    this.props.SignUp(this.state)
    }
    else {
      this.setState({
        error: true
      })
    }
  }

  render() {
    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
             Create an account
            </Header>
            {this.state.error ?
              <Label color={'orange'} pointing='below'>All fields are required.</Label>
              : null
            }
            <Form size='large' onSubmit={(e) => this.handleSubmit(e)}>
              <Segment stacked>
                <Form.Group widths='equal'>
                <Form.Input
                  placeholder='First name'
                  onChange={(e) => this.changeHandler(e)}
                  name="first_name"
                  value={this.state.first_name}
                 />
                <Form.Input
                  placeholder='Last name'
                  onChange={(e) => this.changeHandler(e)}
                  name="last_name"
                  value={this.state.last_name}
                  />
                </Form.Group>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={(e) => this.changeHandler(e)}
                  name="email"
                  value={this.state.email}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.changeHandler(e)}
                  name="password"
                  value={this.state.password}
                />
              <Button color='teal' fluid size='large' type='submit'>
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message >
              Have an account? <a onClick={() => this.props.history.push('/login')}>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )}

}

export default SignUp
