import React, { Component } from 'react';
import ViewEvent from './viewEvent'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// import Backround from '../lib/abstract-astro-astronomy-956999.jpg'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { Container, Button, Header, Icon, Modal, Form, Card, Image, Label} from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import AuthAdapter from '/Users/flatironschool/Development/final-project/final-project-front-end-2/src/lib/AuthAdapter.js'



TimeAgo.addLocale(en)

class EventTop extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    // this.state.items = this.props.eventData;
  }

  joinEvent=(event_id) => {
    AuthAdapter.joinEvent({group_id: this.props.match.params.id, volounteer_id: this.props.user.id, event_id: event_id})
    .then(res => res.json())
    .then(data => {
      console.log("joined the event", data)
      // window.location.reload();
    })
  }



    cardstyle = () => {
      return { height: '100%'}
    }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.eventData.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.eventData.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
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

  cards = (arr) => {
    let cards = arr.map((item)=> {
      const timeAgo = new TimeAgo('en-US')
      console.log(item)
      return (
        <div>
          <style>
            {
              `#card {
                max-width: 75%;
              }`
            }
          </style>
          <Card fluid id="card" color='#a9d1c9' style={{minHeight: 250, minWidth: 275, color: '#a9d1c9'}}>
            <Card.Content>
              <Icon color='teal' floated='right' name='bell'/>
            <Card.Meta>{timeAgo.format(new Date(item.created_at))}</Card.Meta>
              <br/><Card.Header>{item.description}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta><Icon name='map marker'/>11 schevchenko place, spring valley, NY</Card.Meta>
              <Card.Meta>2 volounteers needed</Card.Meta>
              <ViewEvent event_id={item.id} joinEvent={this.joinEvent} user={this.props.user}/>
            </Card.Content>
          </Card>
        </div>
      )
    })
    return cards
  }


  render() {
    console.log(this.props)
    const { activeIndex } = this.state;
    const slides = this.iterater3(this.props.eventData).map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item[0].id}
          onExiting={this.onExiting}
          onExited={this.onExited}
          >
          <Card.Group style={{minHeight: '600px'}}>
          {this.cards(item)}
          </Card.Group>
        </CarouselItem>
      );
    });


    return (
      <div>
        <style>
          {
            `.custom-tag {
                height: 300px;
                background: #ffffff;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.iterater3(this.props.eventData)} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default withRouter(EventTop);
