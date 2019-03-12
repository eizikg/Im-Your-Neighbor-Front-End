import React, { Component } from 'react';
import ViewEvent from './viewEvent'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Slider from './Slider.js'
import { Container, Button, Item, Menu, Header, Grid, Icon, Segment ,Modal, Form, Card, Image, Label} from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import AuthAdapter from '../../lib/AuthAdapter.js'
import { CSSTransitionGroup } from 'react-transition-group'
import NewEvent from './newEvent.js'


TimeAgo.addLocale(en)

class EventTop extends Component {



  state={
    currentIndex: 0,
    allEvents: [],
    currentEvents: [],
    eventData: this.props.eventData
  }


  joinEvent=(event_id) => {
    AuthAdapter.joinEvent({group_id: this.props.match.params.id, volounteer_id: this.props.user.id, event_id: event_id})
    .then(res => res.json())
    .then(data => {
      console.log("joined the event", data)
      // window.location.reload();
    })
  }

  newEvent = (params) => {
    // e.preventDefault()
    AuthAdapter.newEvent({...params, group_id: this.props.match.params.id})
    .then(res => res.json())
    .then(data => {
      console.log("created new event",data)
      let newObject = [ ...this.state.eventData, data ]
      this.setState({
        eventData: newObject
      })
    })
  }

  updateEvent = (event_id) => {
    AuthAdapter.updateEvent({event_id: event_id, active: false, group_id: this.props.match.params.id})
    .then(res => res.json())
    .then(data => {
      let newState = this.state.eventData.filter((event)=> {
        return event.id !== event_id
      })
      console.log(newState)
      this.setState({
        active: false,
        eventData: newState
      })
    })
  }

 componentDidUpdate = (prevProps) => {
   if (this.props.eventData !== prevProps.eventData){
     this.setState({
       eventData: this.props.eventData
     })
   }
 }

 componentDidMount = (prevProps) => {
     this.setState({
       eventData: this.props.eventData
     })
   }



  iterater3 = (arr) => {
    let n = arr.length
    let items = []
    for (let i = 0; i < n;) {
      const tmp = []
      for (let x = 0; x< 3 && i < n; x++){
        tmp.push(arr[i])
        i++
      }
      items.push(tmp)
    }
    return items
  }


  render() {
    console.log("eventtop state: ",this.state)
    const slides = this.iterater3(this.state.eventData.slice(0).reverse())


    return (
      <div>
        <br/>
        <NewEvent
          newEvent={this.newEvent}
          />
        <br/>
        <br/>
        <Slider
          group_id={this.props.match.params.id}
          item={slides}
          user={this.props.user}
          joinEvent={this.joinEvent}
          updateEvent={this.updateEvent}
          />
      </div>
    );
  }
}

export default withRouter(EventTop);
