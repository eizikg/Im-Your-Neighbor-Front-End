import React, { Component } from 'react';

const EachGroup = (props) =>{

  let joinGroup = (e)=>{
    console.log(props.user.id)
    fetch('http://localhost:3000/api/v1/group_volounteers', {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: localStorage.token},
      body: JSON.stringify({
        volounteer_id: props.user.id,
         group_id: props.groupData.id
        })
    })
    .then(res => res.json())
    .then(data => props.memberRoute(props.user))
  }

  // let joinGroup = ()=> {
  //
  // }

  return (
               <div>
               <div className="container">
     	          <div className="row">

			             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

					      <div className="box-part text-center">
                <i className="fa fa-instagram fa-3x" aria-hidden="true"></i>

    						<div className="title">
    							<h4>{props.groupData.name}</h4>
    						</div>

    						<div className="text">
    							<span>{props.groupData.description}</span>
    						</div>

    						<button id={props.groupData.id} className="fbtn btn-primary btn-block" onClick={() => joinGroup()} >Join Group</button>

    					 </div>
    				       </div>
                    </div>
                    </div>
                      </div>
          )
          }

export default EachGroup
