import React from "react";
import { connect } from "react-redux";

import ListItem from "../../components/ListItem";
import "./Main.css";
import { getRepositories } from "../../redux/user/reducer";
import RepoIcon from '../../assets/repo-icon'

export class Main extends React.PureComponent {
  render() {
    const { repos } = this.props;
    return (
      <>
        <form aria-label="Repositories" role="search" className="search-form md-flex md-flex-wrap">
          <div className="md-flex">
            <input
              type="search"
              id="repos-filter"
              name="search-box"
              placeholder="Find a repository…"
              autoComplete="off"
              aria-label="Find a repository…"
              value=""
              className="search-box"
              onChange={() => {}}
            />
          </div>
          <button className="btn btn-primary"><RepoIcon className="repo-icon"/> New</button>
        </form>
        <ul className="repo-list">{this.renderRepositories(repos)}</ul>
      </>
    );
  }

  componentDidMount() {
    this.props.getRepositories();
  }

  componentDidUpdate(prevProps) {}

  ///////////////////////////////////////////////////////////////////////
  //  RENDER METHODS
  ///////////////////////////////////////////////////////////////////////
  renderRepositories(repos) {
    return repos.map((repo) => {
      return <ListItem key={repo?.id} data={repo} />;
    });
  }
}

///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////
function mapStateToProps(state) {
  const { user } = state;
  const userToJS = user.toJS();

  return {
    repos: userToJS.user.repos,
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(mapStateToProps, {
  getRepositories,
})(Main);
