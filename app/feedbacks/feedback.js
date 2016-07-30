import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import {yellow500, blue500} from 'material-ui/styles/colors';

class Feedback extends Component {

    mapInvited = invited => {

      let disabled = (invited.feedbacks)? '': '-disabled';
      const badgeStyle = { 
        top: 10, 
        right: 30,
        backgroundColor: blue500
      }
      if(!invited.feedbacks) {
        badgeStyle['backgroundColor'] = '#9E9E9E';
        disabled = '-disabled';
      }

      return <Badge
        key={`badge-${invited.id}`}
        badgeContent={invited.feedbacks}
        secondary={!!invited.feedbacks}
        badgeStyle={badgeStyle}
      >
        <Chip key={`chip-invited-${invited.id}`}
              className={`invited-chip${disabled}`} >
          <Avatar src={invited.url} />
          {invited.name}
        </Chip>
      </Badge>;
    }

    render() {

        const {feedback} = this.props;
        const invited_list = feedback.invited.map(this.mapInvited);
        const start = moment(feedback.start).format('MMMM Do YYYY');
        const finish = moment(feedback.finish).format('MMMM Do YYYY');
        const title = `${start} a ${finish}`;

        return (
            <Card key={`feedback-${feedback.id}`} className="feedback">
                <CardHeader
                title={title}
                avatar={feedback.user.url}
                />
                <CardText className="feedback-invited-list">
                  {invited_list}
                </CardText>
            </Card>
        );
    }
}

export default Feedback;