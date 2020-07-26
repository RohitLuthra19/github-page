import React from 'react';
import { connect } from 'react-redux';

import ListItem from '../../components/ListItem'
import "./Main.css";
import { getRepositories } from '../../redux/user/reducer';

export class Main extends React.PureComponent {
    render() {
      const { repos } = this.props;
      return (
        <ul className="repo-list">
          {this.renderRepositories(repos)}
        </ul>
      );
    }

    componentDidMount() {
      this.props.getRepositories();
    }

    componentDidUpdate(prevProps) {
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderRepositories(repos) {
      return repos.map(repo => {
        return (<ListItem key={repo?.id} data={repo} />)
      })
    }
}

///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////
function mapStateToProps(state) {
  const { user } = state;
  const userToJS = user.toJS();

  return {
    repos : userToJS.user.repos,
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(
  mapStateToProps,
  {
    getRepositories,
  }
)(Main);