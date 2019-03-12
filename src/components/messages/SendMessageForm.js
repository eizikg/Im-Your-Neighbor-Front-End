import React, { Component } from 'react';
import { Form, Input, Button, Icon} from 'semantic-ui-react'

class SendMessageForm extends Component {

  state = {
    message: ''
    }


  handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

  handleSubmit = (e) => {
         e.preventDefault()
         this.props.sendMessage(this.state.message)
         this.setState({
             message: ''
         })
     }



   render() {
         return (
           <div class="type_msg">
            <div class="input_msg_write">
              <Input style={{width: 550}} value={this.state.message} className="write_msg" onChange={this.handleChange} icon={<Icon color='blue' onClick={this.handleSubmit} name='send' inverted circular link />} placeholder="Type a message" />
              </div>
          </div>
         )
     }
}

export default SendMessageForm;
