import fetch from 'isomorphic-fetch';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

const NAMESPACE = "PRFEEDBACK";

export const FEEDBACK_INVITES_INVITE_COMPLETED = "FEEDBACK_INVITES_INVITE_COMPLETED";
export const FEEDBACK_OFFLINE = 'FEEDBACK_OFFLINE';

const STATUS = ['REQUEST','SUCCESS','FAILURE'];

const createRequestTypes = base => STATUS.reduce((acc, type) => {
  acc[type] = `${NAMESPACE}_${base}_${type}`
  return acc
}, {});

export const FEEDBACKS = createRequestTypes('FEEDBACKS');

const action = (type, payload = {}) => {
  return {type, ...payload}
};

const actions = {
  success: (payload) => action(FEEDBACKS.SUCCESS, {payload}),
  failure: (error) => action(FEEDBACKS.FAILURE, {error}),
};

function fetchList() {
    return fetch(`/feedbacks.json` )
            .then(response => response.json() )
            .then(json => json )
}

function* fetchFeedbacks() {
    try {
       const feedbacks = yield call(fetchList);
       yield put(actions.success(feedbacks));
    } catch (e) {
       yield put(actions.failure({message: e.message}));
    }
}

export function* sagas() {
  yield* takeEvery(FEEDBACKS.REQUEST, fetchFeedbacks)
}

function bellNotify(state, action) {
  if (typeof state === 'undefined') {
    state = false;
  }

  if(action.type === FEEDBACK_INVITES_INVITE_COMPLETED) {
    state = true;
  }

  return state;
};

function offline(state, action) {
  if (typeof state === 'undefined') {
    state = false;
  }

  if(action.type === FEEDBACK_OFFLINE) {
    state = action.payload;
  }

  return state;
};

const feedbacksReducer = (state, action) => {
  if(!state) return [];

  if(action.type === FEEDBACKS.SUCCESS) {
    return action.payload;
  }

  return state;
};

export default {
  offline: offline,
  bellNotify: bellNotify,
  feedbacks: feedbacksReducer
};