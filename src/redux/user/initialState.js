import { fromJS } from 'immutable';

export const initialState = fromJS({
  user: {
    fetching: false,
    error: false,
    profile: {},
    repos: [],
  }
})