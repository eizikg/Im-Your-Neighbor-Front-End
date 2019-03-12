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
