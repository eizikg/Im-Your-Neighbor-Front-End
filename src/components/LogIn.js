import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Label} from 'semantic-ui-react'
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

  handleSubmit = (e) => {
    e.preventDefault()
    var {email, password} = this.state
    if (email && password){
    this.props.LogIn(this.state)
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
            Log-in to your account
        </Header>
        {this.state.error ?
          <Label color={'orange'} pointing='below'>All fields are required.</Label>
          : null
        }
        <Form size='large' onSubmit={(e) => this.handleSubmit(e)}>
          <Segment stacked>
            <Form.Input
              placeholder='email'
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
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a onClick={() => this.props.history.push('/signup')} href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
    );
  }

}

export default LogIn;
