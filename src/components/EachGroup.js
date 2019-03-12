import React from 'react'
import { Button, Card, Image, Icon} from 'semantic-ui-react'

const EachGroup = (props) => {
  return (
    <Card style={{margin: '15px'}}>
      <Card.Content>
        <Image floated='right' size='mini' src='http://www.austingalano.org/wp-content/uploads/2015/09/groups.jpg' />
        <Card.Header>{props.groupData.name}</Card.Header>
        <Card.Meta>{props.groupData.volounteers_count} Members</Card.Meta>
        <Card.Description>
          {props.groupData.description}
        </Card.Description>
      </Card.Content>
      <Card.Meta extra><Icon name='map marker' color='orange'/>{props.groupData.neighborhood}</Card.Meta>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => props.JoinGroup(props.groupData.id)}>
            {props.owner ? "View": "Join"}
          </Button>
        </div>
      </Card.Content>
    </Card>
)}

export default EachGroup
