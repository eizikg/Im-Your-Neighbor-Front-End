import React, { Component } from 'react';
import ViewEvent from './viewEvent'
// import { Button, Header, Image, Modal } from 'semantic-ui-react'


class eventTop extends Component{

   joinEvent = () => {
     let event_id = this.props.eventData.id
     let group_id = this.props.group_id
     this.props.joinEvent({event_id: event_id, group_id:group_id})
  }

   viewEvent = () => {
    console.log("view");
    return <ViewEvent/>
  }

    style = {
      width: "18rem"
    }

    render(){
      console.log("props passed to event component:", this.props)
    return (
      <div>

          <div className="card" style={this.style}>
            <div className="card-body">
              <h5 className="card-title">{this.props.eventData.description}</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <ViewEvent event_id={this.props.eventData.id} joinEvent={this.joinEvent} user={this.props.user}/>
            </div>

        </div>
      </div>
    )
  }
}

export default eventTop
