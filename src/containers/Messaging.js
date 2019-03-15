import React, { Component } from 'react';
// import { Chatkit.ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Chatkit from '@pusher/chatkit'
import MessageList from '../components/messages/MessageList.js'
import SendMessageForm from '../components/messages/SendMessageForm.js'
import { Header, Icon, Segment} from 'semantic-ui-react'
import { connect } from 'react-redux';

class Messaging extends Component {

  state = {
    messages: []
    }

  instanceLocator = 'v1:us1:411b0598-90f0-462c-9c5e-7700603c4122'
  roomId=19439122
  username='admin'
  secretKey='dabd03b3-b4d0-472d-9ebd-df69eac61ef7:VgvPufaNN+RnU0216cU9eZX+TCLDHl1rzi0D+lmC3SA='
  testToken='https://us1.pusherplatform.io/services/chatkit_token_provider/v1/411b0598-90f0-462c-9c5e-7700603c4122/token'

  componentDidUpdate = (prevProps) => {
      if (this.props.user.email && this.props !== prevProps){

       const chatManager = new Chatkit.ChatManager({
           instanceLocator: this.instanceLocator,
           userId: this.props.user.email,
           tokenProvider: new Chatkit.TokenProvider({
               url: this.testToken
           })
       })

       chatManager.connect()
       .then(currentUser => {
          this.currentUser = currentUser
          currentUser.subscribeToRoom({
            roomId: this.props.groupData.room_id,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
         //for members that just joined the new group we need to add them to the group
        if (this.props.newJoin){
         currentUser.addUserToRoom({
           userId: this.props.user.email,
           roomId: this.props.groupData.room_id
         })
         .then(() => {
           console.log(`Added ${this.props.user.first_name} to room ${this.props.groupData.room_id}`)
         })
         .catch(err => {
           console.log(`Error adding ${this.props.user.first_name} to room ${this.props.groupData.room_id}: ${err}`)
         })
        }

      })
    }
  }

   sendMessage = (text) => {
         this.currentUser.sendMessage({
             text,
             roomId: this.props.groupData.room_id
         })
     }



   render() {
         return (
           <Segment>
             <div className="app">
               <Header><Icon color='orange' inverted name='chat' />Group Chat</Header>
               <MessageList
                   roomId={this.state.roomId}
                   messages={this.state.messages} />
               <SendMessageForm
                   sendMessage={this.sendMessage} />
             </div>
             </Segment>
         );
     }

}

const mapStateToProps = state => {
   return {IsLoggedIn: state.IsLoggedIn, user: state.user}
 }

export default Messaging;
