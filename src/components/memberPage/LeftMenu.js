import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Label,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Ref,
  Visibility,
} from 'semantic-ui-react'
import React, { Component } from 'react';
import { withRouter , Redirect} from "react-router";

class LeftMenu extends Component {


  state={
    groups: [],
    activeItem: ""
  }


  // params = () => {
  //   return this.props.match.params.id
  // }

  // componentDidMount(){
  //   fetch(`http://localhost:3000/api/v1/volounteers/${this.props.user.id}`, {
  //     method: "GET",
  //     headers: {"Content-Type": "application/json",
  //     Authorization: localStorage.token}
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     this.setState({
  //       groups: data.groups
  //     })
  //   })
  // }
  handleGroupChange = (e, {name}) => {
    console.log(name)
    this.setState({ activeItem: name })
    this.props.history.push(`/test/${name}`)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.user !== prevProps.user){
    fetch(`http://localhost:3000/api/v1/volounteers/${this.props.user.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      Authorization: localStorage.token}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let param = this.props.match.params.id
      console.log(param)
      this.setState({
        groups: data.groups,
        activeItem: parseInt(param)
      })
    })
  }
  }


  componentDidMount = (prevProps) => {
    let param = this.props.match.params.id
      this.setState({
        activeItem: param
      })
  }

  render() {
    const { activeItem } = this.state || {}
    console.log(this.props.members)
    return (
      <div>
      <Menu id="menu" size="large" pointing vertical style={{ minHeight: 1000}}>

      <Menu.Item>
      <Menu.Header>Your Groups</Menu.Header>

      <Menu.Menu>
      {this.state.groups.map((group) => {
        return (
        <Menu.Item
        name={group.id}
        active={activeItem === group.id}
        onClick={this.handleGroupChange}
        color='red'
        >
        <Menu.Header>{`${group.name}`}</Menu.Header>
        </Menu.Item>
      )
      })}
      </Menu.Menu>
      </Menu.Item>


      <Menu.Item>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <hr/>
      <Menu.Header size="huge">Members    <Icon name='users'/></Menu.Header>

      <Menu.Menu>
      {this.props.members.map((member) => {
        return (
        <Menu.Item
        >
        <Icon color='teal'  name='user large circle'></Icon>
        {`${member.first_name} ${member.last_name}`}
        {member.is_admin ? <Label color="blue">admin</Label> : null}
        </Menu.Item>
      )
      })}
      </Menu.Menu>
      </Menu.Item>




      <Menu.Item>
      <Menu.Header>Support</Menu.Header>

      <Menu.Menu>
      <Menu.Item
      name='email'
      active={this.activeItem === 'email'}
      onClick={this.handleItemClick}
      >


          Veronika Ossi
          <Icon name='user circle'></Icon>


      </Menu.Item>

      <Menu.Item
      name='faq'
      color='red'
      active={this.activeItem === 'faq'}
      onClick={this.handleItemClick}
      >
      FAQs
      </Menu.Item>
      </Menu.Menu>
      </Menu.Item>
      </Menu>
      </div>
    );
  }

}



// <Menu.item>
// <Menu.Header>Members</Menu.Header>
// <Menu.Menu>
//   {this.props.members.map((member) => {
//     return (
//          <Menu.item
//            name={member.id}
//            active={activeItem === member.id}
//            onClick={this.handleGroupChange}
//            color='red'
//            >
//           {`${member.first_name} ${member.last_name}`}
//           <Icon name='user circle'></Icon>
//           </Menu.item>
//   )
// })}
// </Menu.Menu>
// </Menu.item>


export default withRouter(LeftMenu)
