import React from "react";
import { connect } from "react-redux";

import ListItem from "../../components/ListItem";
import "./Main.css";
import { getRepositories } from "../../redux/user/reducer";
import RepoIcon from "../../assets/repo-icon";

export class Main extends React.PureComponent {
  state = {
    searchInput: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  render() {
    const { repos, fetching } = this.props;
    const { searchInput } = this.state;

    if(fetching) {
      return <>Loading...</>
    } else return (
      <>
        <form
          aria-label="Repositories"
          role="search"
          className="search-form md-flex md-flex-wrap"
        >
          <input
            type="search"
            id="repos-filter"
            name="search-box"
            placeholder="Find a repository…"
            autoComplete="off"
            aria-label="Find a repository…"
            value={searchInput}
            className="search-box"
            onChange={this.handleChange}
          />
          <div className="md-flex">
            <button className="btn btn-primary">
              <RepoIcon className="repo-icon" /> New
            </button>
          </div>
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
    const { searchInput } = this.state;
    return repos
      .filter((item) =>
        item?.name?.toLowerCase().includes(searchInput?.toLowerCase())
      )
      .map((repo) => {
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
    fetching: userToJS.user.fetching
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(mapStateToProps, {
  getRepositories,
})(Main);
