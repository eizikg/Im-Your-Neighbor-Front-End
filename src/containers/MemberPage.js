import React, { Component } from 'react';
import AuthAdapter from '../lib/AuthAdapter'

class MemberPage extends Component {

  state={
    group_data: [],
  }

  componentDidMount(){
      AuthAdapter.joinGroup(this.props.user.id, this.props.match.params.name)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
      this.setState({
        group_data: data
      })
      this.props.history.push('/member_page')
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
      welcome to member page
      </div>
    );
  }

}

export default MemberPage;
