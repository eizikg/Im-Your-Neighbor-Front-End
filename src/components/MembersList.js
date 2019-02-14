import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Grid} from 'semantic-ui-react'

const MembersList = ({member}) => (


  <Card>
    <style>
      {
        `.custom-tag {
            max-width: 100%;
            height: 425px;
          }`
      }
    </style>
    <Image src='https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-stock-vector-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg?ver=6' />
    <Card.Content>
      <Card.Header>{member.first_name} {member.last_name}</Card.Header>
      <Card.Meta>
        {member.is_admin ?  <span>Admin</span>: null}
      </Card.Meta>
    </Card.Content>
  </Card>

)

export default MembersList
