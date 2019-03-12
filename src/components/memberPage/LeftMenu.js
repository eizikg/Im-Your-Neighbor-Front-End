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
  Dropdown
} from 'semantic-ui-react'
import React, { Component } from 'react';
import { withRouter , Redirect} from "react-router";

class LeftMenu extends Component {


  state={
    groups: [],
    activeItem: "",
    showGroups: false
  }

  handleGroupChange = (e, {name}) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/members/${name}`)
  }
  componentDidMount = (prevProps) => {
    let param = this.props.match.params.id
      this.setState({
        activeItem: parseInt(param)
      })
  }

  render() {
    const { activeItem } = this.state || {}
    let groups = this.props.user.groups ? this.props.user.groups.map((group) => {
      return (
      <Menu.Item
      name={group.id}
      active={activeItem === group.id}
      onClick={this.handleGroupChange}
      >
      <Menu.Header>{`${group.name}`}</Menu.Header>
      </Menu.Item>
    )
  }) : null
    return (
      <div>
      <Menu id="menu" size="large" pointing vertical style={{ minHeight: 1000}}>
      <Menu.Item >
        <Button size='small' content='Log Out' onClick={this.props.logOut}/><br/>
        <Dropdown inline floating icon='angle down' text='Groups'>
          <Dropdown.Menu>
          <Dropdown.Item  icon='setting' text="Your groups" onClick={() => this.setState({showGroups: !this.state.showGroups})}/>
          <Dropdown.Item  icon='search plus' text="Explore more groups" onClick={() => this.props.history.push(`/groups`)}/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <br/>
        { this.state.showGroups ?
     <Menu.Item>
       <Menu.Header>Your Groups</Menu.Header>
       <Menu.Menu>{groups}</Menu.Menu>
     </Menu.Item> : null
     }
      <Menu.Item>
        <Menu.Header size="huge">Members    <Icon name='users'/></Menu.Header>
        <Menu.Menu>
          {this.props.members.map((member) => {
          return (
        <Menu.Item >
          <Icon color='teal'  name='user large circle'></Icon>
          {`${member.first_name} ${member.last_name}`}
          {member.is_admin ? <Label color="blue">admin</Label> : null}
        </Menu.Item>
          )
          })}
        </Menu.Menu>
      </Menu.Item>
      </Menu>
      </div>
    );
  }

}


export default withRouter(LeftMenu)
