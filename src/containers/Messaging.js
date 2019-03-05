import React, { Component } from 'react';
// import { Chatkit.ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Chatkit from '@pusher/chatkit'
import MessageList from '../components/messages/MessageList.js'
import SendMessageForm from '../components/messages/SendMessageForm.js'

class Messaging extends Component {

  state = {
    messages: []
    }

  instanceLocator = 'v1:us1:411b0598-90f0-462c-9c5e-7700603c4122'
  roomId=19439122
  username='admin'
  secretKey='dabd03b3-b4d0-472d-9ebd-df69eac61ef7:VgvPufaNN+RnU0216cU9eZX+TCLDHl1rzi0D+lmC3SA='
  testToken='https://us1.pusherplatform.io/services/chatkit_token_provider/v1/411b0598-90f0-462c-9c5e-7700603c4122/token'

  componentDidMount() {
       const chatManager = new Chatkit.ChatManager({
           instanceLocator: this.instanceLocator,
           userId: 'admin',
           tokenProvider: new Chatkit.TokenProvider({
               url: this.testToken
           })
       })

       chatManager.connect()
       .then(currentUser => {
            this.currentUser = currentUser
            currentUser.subscribeToRoom({
            roomId: currentUser.rooms[0].id,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
      })
   }

   sendMessage = (text) => {
         this.currentUser.sendMessage({
             text,
             roomId: this.roomId
         })
     }



   render() {
         return (
             <div className="app">
               <MessageList
                   roomId={this.state.roomId}
                   messages={this.state.messages} />
               <SendMessageForm
                   sendMessage={this.sendMessage} />
             </div>
         );
     }

}

export default Messaging;
