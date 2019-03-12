import React, { Component } from 'react';
import TimeAgo from 'javascript-time-ago'
import ViewEvent from './viewEvent'
import en from 'javascript-time-ago/locale/en'
import { Container, Button, Item, Header, Grid, Icon, Segment ,Modal, Form, Card, Image, Label} from 'semantic-ui-react'
import { CSSTransitionGroup } from 'react-transition-group'

TimeAgo.addLocale(en)

class Slider extends Component {

  state={
    currentIndex: 0
  }


  next() {
    let { currentIndex } = this.state
    let arrayLength = this.props.item.length
    if (currentIndex + 1 < arrayLength){
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    }
  }

  previous() {
    let { currentIndex } = this.state
    let arrayLength = this.props.item.length
    if (currentIndex > 0){
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
    }
  }


  cards = () => {
    let { currentIndex } = this.state
    if (this.props.item  && this.props.item.length > 0){
    let cards = this.props.item[currentIndex].map((item)=> {
      const timeAgo = new TimeAgo('en-US')
      console.log(item)
      return (
        <div>
          <style>
            {
              `#card {
                border-style: solid;
                border-width: 2px;
                border-color: white;
                border-radius: 12px;
                box-shadow: 2px 1px 10px #888888;
                background-color: white;
              }`
            }
          </style>
          <Card fluid id="card" color='#a9d1c9' style={{minHeight: 275, minWidth: 275, maxWidth: 275, margin: '15px', color: '#a9d1c9'}}>
            <Card.Content>
              <Icon color='teal' floated='right' name='clock outline'/>
              {timeAgo.format(new Date(item.created_at))}
              <br/><Card.Description>{item.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>
              </Card.Meta>
              <Card.Meta>
                <Icon color='orange' name='map marker'/>
                {item.address}
              </Card.Meta>
              <Card.Meta color='teal'>{item.volounteers_required > 0 ? <div><Icon color='violet' name='user circle outline'/>{item.volounteers_required} volounteer required</div>: null}</Card.Meta>
              <ViewEvent eventData={item} group_id={this.props.group_id} event_id={item.id} joinEvent={this.props.joinEvent} user={this.props.user} updateEvent={this.props.updateEvent}/>
            </Card.Content>
          </Card>
        </div>
      )
    })
    return (<Card.Group key={currentIndex}>{cards}</Card.Group>)
  }
  }

  render() {
    console.log("slider props", this.props.item)
    const {currentIndex} = this.state
    return (
      <Grid divided middle aligned style={{marginTop: '20px', alignItems: 'center', justifyContent: 'center'}}>

        <Icon onClick={() => this.previous()} link color='teal' size='huge' name='angle left'/>
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={700}
            transitionLeave={false}
            transitionAppear={true}
            transitionAppearTimeout={500}
            >
                {this.props.item.length > 1 ? this.cards(): <span>Group events will apear here.</span>}
            </CSSTransitionGroup>
        <Icon center onClick={() => this.next()} link color='teal' size='huge' name='angle right'/>
      </Grid>
    );
  }

}

export default Slider;
