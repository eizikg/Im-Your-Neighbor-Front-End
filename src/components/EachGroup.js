import React, { Component } from 'react';

const EachGroup = (props) =>{



  console.log(props)

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

    						<button id={props.groupData.id} className="fbtn btn-primary btn-block" onClick={() => props.JoinGroup(props.groupData.id)} >Join Group</button>

    					 </div>
    				       </div>
                    </div>
                    </div>
                      </div>
          )
          }

export default EachGroup
