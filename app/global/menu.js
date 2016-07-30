import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import {yellow500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router'

@connect( (state) => ({
  bellNotify: state.bellNotify
}) )
export default class Menu extends React.Component {

  render() {

    const buttonStyle = {
      padding: 0,
      top: '10px'
    };

    const iconStyle = {
      fontSize: '30px',
      color: '#555'
    };

    const bellStyle = {
      position: 'absolute',
      left: '-30px'
    };

    const styles = {
      backgroundColor: yellow500
    };

    return(
      <Toolbar style={styles} className="feedbacks-menu">
        <ToolbarGroup>
          <IconButton
            style={buttonStyle}
            iconStyle={iconStyle}
            iconClassName="fa fa-search" />
        </ToolbarGroup>
        <ToolbarGroup> </ToolbarGroup>
        <ToolbarGroup>
          <IconButton
            style={buttonStyle}
            iconStyle={iconStyle}
            iconClassName="fa fa-smile-o" />
        </ToolbarGroup>
        <ToolbarGroup>
          <div className="mdl-layout--small-screen-only feedbacks-menu__refresh">
            <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw" />
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <div style={bellStyle} className="mdl-layout--small-screen-only">
            <Link to={`/invites`}>
              <IconButton
                style={buttonStyle}
                iconClassName="fa fa-bell-o" />
            </Link>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )

  }

}