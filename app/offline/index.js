import  { FEEDBACK_OFFLINE } from 'api';

//consultar chrome://appcache-internals/
export default class OfflineWorker {

  type = 'online';

  constructor(store) {
    this.store = store;

    const appCache = window.applicationCache;

    window.addEventListener('load', function () {
      window.addEventListener('online', this.updateStatus.bind(this));
      window.addEventListener('offline', this.updateStatus.bind(this));

      if( appCache.status > appCache.UNCACHED ) {
        appCache.addEventListener('updateready', this.updateVersion.bind(this));
        appCache.update();
      }

    }.bind(this));
  }

  updateVersion = () => {
    const {applicationCache, location} = window;
    applicationCache.swapCache();
    location.reload();
  }

  register = () => {
    console.log("Qual evento?", this.type, arguments);
    let state = this.store.getState();

    console.log("state", state);

    if( state.offline ) {
      debugger;
    }

  }

  updateStatus = (event) => {
    this.type = event.type;
    this.store.dispatch({
      type: FEEDBACK_OFFLINE,
      payload: this.type === 'offline'
    });
  }

}