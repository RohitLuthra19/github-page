import React from "react";
import { connect } from "react-redux";

import ListItem from "../../components/ListItem";
import Dropdown from "../../components/Dropdown";
import { getRepositories } from "../../redux/user/reducer";
import RepoIcon from "../../assets/repo-icon";
import "./Main.css";

export class Main extends React.PureComponent {
  state = {
    searchInput: "",
    type: [
      {
        id: 0,
        title: 'All',
        selected: true,
        key: 'all'
      },
      {
        id: 1,
        title: 'Public',
        selected: false,
        key: 'public'
      },
      {
        id: 2,
        title: 'Private',
        selected: false,
        key: 'private'
      }
    ],
    language: [
      {
        id: 0,
        title: 'All',
        selected: true,
        key: 'all'
      },
      {
        id: 1,
        title: 'JavaScript',
        selected: false,
        key: 'javascript'
      },
      {
        id: 2,
        title: 'Html',
        selected: false,
        key: 'HTML'
      },
      {
        id: 3,
        title: 'CSS',
        selected: false,
        key: 'css'
      },
    ]
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  handleType = (id) => {
    let temp = this.state.type
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      type: temp
    });
  }

  handleLanguage = (id) => {
    let temp = this.state.language
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      language: temp
    });
  }

  render() {
    const { repos, fetching } = this.props;
    const { searchInput, type, language } = this.state;

    if (fetching) {
      return <>Loading...</>;
    } else
      return (
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
              <Dropdown
                title="Type"
                list={type}
                resetThenSet={this.handleType}
              />

              <Dropdown
                title="Language"
                list={language}
                resetThenSet={this.handleLanguage}
              />

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
    fetching: userToJS.user.fetching,
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(mapStateToProps, {
  getRepositories,
})(Main);
