import * as types from './types';
//import { fromJS } from 'immutable';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
    switch(action.type) {

        //Get all user
        case types.GET_USER_PROFILE_REQUEST:
            return state.setIn(['user', 'fetching'], true)
              .setIn(['user', 'error'], false);

        case types.GET_USER_PROFILE_SUCCESS:
            const { data } = action;

            return state.setIn(['user', 'fetching'], false)
              .setIn(['user', 'error'], false)
              .setIn(['user', 'profile'], data);

        case types.GET_USER_PROFILE_FAILURE:
            return state.setIn(['user', 'fetching'], false)
              .setIn(['user', 'error'], true);

        case types.GET_REPOSITORIES_REQUEST:
            return state.setIn(['user', 'fetching'], true)
              .setIn(['user', 'error'], false);

        case types.GET_REPOSITORIES_SUCCESS:
            const { data: reposData } = action;
            
            return state.setIn(['user', 'fetching'], false)
              .setIn(['user', 'error'], false)
              .setIn(['user', 'repos'], reposData);

        case types.GET_REPOSITORIES_FAILURE:
            return state.setIn(['user', 'fetching'], false)
              .setIn(['user', 'error'], true);

        default: 
            return state;
    }
}

export default reducer;

export const getUserProfile = () => ({ type: types.GET_USER_PROFILE_REQUEST })
export const getRepositories = () => ({ type: types.GET_REPOSITORIES_REQUEST })
