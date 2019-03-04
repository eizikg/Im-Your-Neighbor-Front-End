import React, { Component } from 'react';

class MessageList extends Component {

  render() {
        // return (
            // <ul className="message-list">
            //     {this.props.messages.map((message, index) => {
            //         return (
            //           <li  key={message.id} className="message">
            //             <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
            //             <div>{message.senderId}</div>
            //             <div>{message.text}</div>
            //           </li>
            //         )
            //     })}
            // </ul>
        //
        //
        // )
        return (
          <div class="messaging">
            <div class="inbox_msg">
              <div class="mesgs">
                <div class="msg_history">
                {this.props.messages.map((message, index) => {
                    return (
                      <div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                          <div class="received_msg">
                            <div class="received_withd_msg">
                            <p>{message.text}</p>
                            <span class="time_date"> 11:01 AM    |    June 9</span></div>
                            </div>
                          </div>
                    )
                })}
                </div>
              </div>
            </div>
          </div>
        )
    }

}

export default MessageList;
