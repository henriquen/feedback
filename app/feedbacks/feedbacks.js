import React from 'react';
import { connect } from 'react-redux';
import Feedback from 'feedbacks/feedback';
import { FEEDBACKS } from 'api';

@connect( (state) => ({
  feedbacks: state.feedbacks
}) )
export default class Feedbacks extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: FEEDBACKS.REQUEST
    });
  }

  mapFeedbacks = feedback => {
    return <Feedback key={`invite-${feedback.id}`} feedback={feedback} />
  }

  render() {

    const list = this.props.feedbacks.map(this.mapFeedbacks);

    return(
      <div className="feedbacks">
          {list}
      </div>
    )
  }

}
