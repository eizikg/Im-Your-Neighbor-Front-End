import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class newGroup extends Component {



  state={
    name: "",
    descripton: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


   createGroup = (e) => {
     console.log(this.props) ;
    fetch('http://localhost:3000/api/v1/groups', {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: localStorage.token},
      body: JSON.stringify({
        volounteer_id: this.props.user.id,
        name: this.state.name,
        description: this.state.description
      })
    })
    .then(res => res.json())
    .then(console.log)
  }


render(){
  return (
  <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='give your group a name' name='name' value={this.state.name} onChange={this.changeHandler}/>
    </Form.Field>
    <Form.Field>
      <label>description</label>
      <input placeholder='what is your focus?' name='description' value={this.state.description} onChange={this.changeHandler} />
    </Form.Field>
     <Button type='submit' onClick={(e) => this.createGroup()}>Submit</Button>
  </Form>
)
}
}

export default newGroup
