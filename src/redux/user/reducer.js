import * as types from "./types";
// import { fromJS } from 'immutable';
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Get all user
    case types.GET_USER_PROFILE_REQUEST:
      return state
        .setIn(["user", "fetching"], true)
        .setIn(["user", "error"], false);

    case types.GET_USER_PROFILE_SUCCESS:
      const { data } = action;

      return state
        .setIn(["user", "fetching"], false)
        .setIn(["user", "error"], false)
        .setIn(["user", "profile"], data);

    case types.GET_USER_PROFILE_FAILURE:
      return state
        .setIn(["user", "fetching"], false)
        .setIn(["user", "error"], true);

    case types.GET_REPOSITORIES_REQUEST:
      return state
        .setIn(["user", "fetching"], true)
        .setIn(["user", "error"], false);

    case types.GET_REPOSITORIES_SUCCESS:
      const { data: reposData } = action;

      return state
        .setIn(["user", "fetching"], false)
        .setIn(["user", "error"], false)
        .setIn(["user", "repos"], reposData)
        .setIn(["user", "filteredRepos"], reposData);

    case types.GET_REPOSITORIES_FAILURE:
      return state
        .setIn(["user", "fetching"], false)
        .setIn(["user", "error"], true);

    case types.FILTER_REPOSITORIES_REQUEST:
      const clonedRepo = state.getIn(["user", "repos"]);
      if (action?.languageFilter !== "all") {
        const filteredRepos = clonedRepo.filter(
          (item) =>
            item?.language?.toLowerCase() ===
            action?.languageFilter.toLowerCase()
        );
        return state.setIn(["user", "filteredRepos"], filteredRepos);
      } else {
        return state.setIn(["user", "filteredRepos"], clonedRepo);
      }

    case types.TYPE_FILTER_REPOSITORIES_REQUEST:
      const clonedRepoForTypeFilter = state.getIn(["user", "repos"]);
      switch (action?.typeFilter) {
        case "all":
          return state.setIn(
            ["user", "filteredRepos"],
            clonedRepoForTypeFilter
          );
        case "private": {
          const filteredRepos = clonedRepoForTypeFilter.filter(
            (item) => item?.private === true
          );
          return state.setIn(["user", "filteredRepos"], filteredRepos);
        }
        case "public": {
          const filteredRepos = clonedRepoForTypeFilter.filter(
            (item) => item?.private === false
          );
          return state.setIn(["user", "filteredRepos"], filteredRepos);
        }
        case "forks": {
          const filteredRepos = clonedRepoForTypeFilter.filter(
            (item) => item?.forks !== 0
          );
          return state.setIn(["user", "filteredRepos"], filteredRepos);
        }
        case "archived": {
          const filteredRepos = clonedRepoForTypeFilter.filter(
            (item) => item?.archived === true
          );
          return state.setIn(["user", "filteredRepos"], filteredRepos);
        }
        case "mirrors": {
          const filteredRepos = clonedRepoForTypeFilter.filter(
            (item) => item?.mirror_url !== null
          );
          return state.setIn(["user", "filteredRepos"], filteredRepos);
        }
        default:
          return state.setIn(
            ["user", "filteredRepos"],
            clonedRepoForTypeFilter
          );
      }

    default:
      return state;
  }
};

export default reducer;

export const getUserProfile = () => ({ type: types.GET_USER_PROFILE_REQUEST });
export const getRepositories = () => ({ type: types.GET_REPOSITORIES_REQUEST });
export const filterRepositories = (languageFilter) => ({
  type: types.FILTER_REPOSITORIES_REQUEST,
  languageFilter,
});
export const typeFilterRepositories = (typeFilter) => ({
  type: types.TYPE_FILTER_REPOSITORIES_REQUEST,
  typeFilter,
});
