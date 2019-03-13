import React, { Component } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Container } from 'semantic-ui-react'

TimeAgo.addLocale(en)

class MessageList extends Component {

  render() {
        const timeAgo = new TimeAgo('en-US')
        return (
          <Container textAlign='justified'>
          <div className="messaging">
            <style>{
                `
                .mesgs{
  	              background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
              }
              `
            }</style>
            <div className="inbox_msg">
              <div className="mesgs">
                <div className="msg_history">
                {this.props.messages.lenght > 0 ? this.props.messages.map((message, index) => {
                  // console.log(message)
                    return (
                      <div className="incoming_msg">
                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                          <div className="received_msg">
                              <div className="received_withd_msg">
                                <span className="time_date">{message.sender.name}</span>
                            <p>{message.text}<span class="time_date">{timeAgo.format(new Date(message.createdAt))}</span></p>
                            </div>
                            </div>
                          </div>
                    )
                }) : <span>Messages will apear here.</span> }
                </div>
              </div>
            </div>
          </div>
        </Container>
        )
    }

}

export default MessageList;
