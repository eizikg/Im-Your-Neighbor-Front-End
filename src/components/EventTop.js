// import React, { Component } from 'react';
// import ViewEvent from './viewEvent'
// import Backround from '../lib/abstract-astro-astronomy-956999.jpg'
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption
// } from 'reactstrap';
// import { Container, Button, Header, Icon, Modal, Form, Card, Image} from 'semantic-ui-react'
//
//
// class EventTop extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeIndex: 0 };
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.goToIndex = this.goToIndex.bind(this);
//     this.onExiting = this.onExiting.bind(this);
//     this.onExited = this.onExited.bind(this);
//     // this.state.items = this.props.eventData;
//   }
//
//   joinEvent = (event_id) => {
//
//      // let event_id = this.props.eventData.id
//      let group_id = this.props.group_id
//      this.props.joinEvent({event_id: event_id, group_id:group_id})
//   }
//
//   items=this.props.eventData
//
//   data = (item) => {
//   return (
//       <div>
//         <style>
//           {
//             `#card {
//                 max-width: 75%;
//               }`
//           }
//         </style>
//           <Card fluid id="card">
//              <Image src='data:image/jpeg;base64,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'/>
//             <Card.Content>
//               <Card.Header>{item.description}</Card.Header>
//                 <Card.Meta>
//                   <span>Volounteer needed {item.volounteers_required}</span>
//                 </Card.Meta>
//               <ViewEvent event_id={item.id} joinEvent={this.joinEvent} user={this.props.user}/>
//               </Card.Content>
//         </Card>
//       </div>
//     )
//   }
//
//
//     cardstyle = () => {
//       return { height: '100%'}
//     }
//
//   onExiting() {
//     this.animating = true;
//   }
//
//   onExited() {
//     this.animating = false;
//   }
//
//   next() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === this.props.eventData.length - 1 ? 0 : this.state.activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   }
//
//   previous() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === 0 ? this.props.eventData.length - 1 : this.state.activeIndex - 1;
//     this.setState({ activeIndex: nextIndex });
//   }
//
//   goToIndex(newIndex) {
//     if (this.animating) return;
//     this.setState({ activeIndex: newIndex });
//   }
//
  //  cards = () => {
  //   let n = this.props.eventData.length
  //   for (let i = 0; i < n; i++) {
  //     {
  //       const item = []
  //       for (let x = 0; x< 3; x++){
  //         item.push(this.props.eventData[i])
  //         i++
  //       }
  //       return item.map((item) => {
  //         return this.data(item)
  //       })
  //     }
  //
  //   }
  // }
//tested iterater

//
//   render() {
//     const { activeIndex } = this.state;
//
//      console.log("cards",this.cards())
//
//      let slides
//
//   if (this.cards()) {
//      slides = this.cards().map((card) => {
//     return (
//     <CarouselItem
//       className="custom-tag"
//       tag="div"
//       key={1}
//       onExiting={this.onExiting}
//       onExited={this.onExited}
//       >
//       {card}
//     </CarouselItem>
//   )
// })
// }
//
//  console.log(slides)
//
// // return (
// //   <div>hello</div>
// // )
//
//   if (this.props.eventData) {
//      return (
//       <div>
//         <style>
//           {
//             `.custom-tag {
//                 height: 300px;
//                 background: #A0A0A0;
//               }`
//           }
//         </style>
//         <Carousel
//           activeIndex={activeIndex}
//           next={this.next}
//           previous={this.previous}
//         >
//           <CarouselIndicators items={this.props.eventData} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//            {slides}
//           <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
//           <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
//         </Carousel>
//       </div>
//     )} else { return <div>loading...</div>};
//   }
// }
//
// export default EventTop;
import React, { Component } from 'react';
import ViewEvent from './viewEvent'
import Backround from '../lib/abstract-astro-astronomy-956999.jpg'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { Container, Button, Header, Icon, Modal, Form, Card, Image} from 'semantic-ui-react'
import { withRouter } from "react-router-dom"


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

  joinEvent = (event_id) => {

     // let event_id = this.props.eventData.id
     let group_id = this.props.group_id
     this.props.joinEvent({event_id: event_id, group_id:group_id})
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
      return (
        <div>
          <style>
            {
              `#card {
                max-width: 75%;
              }`
            }
          </style>
          <Card fluid id="card">
            <Image src='data:image/jpeg;base64,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'/>
            <Card.Content>
              <Card.Header>{item.description}</Card.Header>
              <Card.Meta>
                <span>Volounteer needed {item.volounteers_required}</span>
              </Card.Meta>
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
          <Card.Group>
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
