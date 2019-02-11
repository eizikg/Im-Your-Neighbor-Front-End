import React, { Component } from 'react';


class eventTop extends Component {
  render(){
    const style = {
      width: "18rem"
    }
    console.log(this.props)
    return (
      <div>

          <div className="card" style={this.style}>
            <div className="card-body">
              <h5 className="card-title">{this.props.groupData.description}</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button href="#" className="btn btn-primary" onClick={(e) => this.props.joinEvent(this.props.groupData.id)}>Join event</button>
            </div>

        </div>
      </div>
    )
  }
}

export default eventTop
