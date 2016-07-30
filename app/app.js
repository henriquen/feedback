import "babel-polyfill";

import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import api, {sagas} from 'api';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FeedbacksTheme from 'theme';
import Menu from './global/menu.js';
import Profile from './profile';

import Invites from 'invites/invites.js';
import Invite from 'invites/invite.js';
import Feedbacks from 'feedbacks/feedbacks.js';

import database from 'database';
import OfflineWorker from 'offline';

injectTapEventPlugin();

class App extends React.Component {

  render() {

    let profile = <div></div>;
    if(!this.props.children) {
      profile = <Profile />;
    }

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(FeedbacksTheme)}>
        <div>
          <Menu />
          <main className="">
            {profile}
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    )
  }

}

class Root extends React.Component {
  render() {

    const sagaMiddleware = createSagaMiddleware();

    const reducer = combineReducers({
      routing: routerReducer,
      ...api
    });

    const store = createStore(
      reducer,
      applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(sagas);

    // const offline = new OfflineWorker(store);
    // store.subscribe(offline.register.bind(offline));

    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/feedbacks" component={Feedbacks} />
            <Route path="/invites" component={Invites} />
            <Route path="/invites/:id" component={Invite}/>
          </Route>
          <Route path="/index.html" component={App} />
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Root  />, document.getElementById('app'));