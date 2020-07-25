import React from 'react';
import { connect } from 'react-redux';

import "./Main.css";
import Spinner from '../../components/Spinner/Spinner';

import { getRepositories } from '../../redux/user/reducer';

export class Main extends React.PureComponent {
    render() {
      const { repos, fetching } = this.props;
      console.log(repos)
      return (
        <div className="main">
          <div className="wrapper">
            {this.renderImages(repos)}
            <Spinner
              left={'60%'}
              top={'60%'}
              fontSize={'3em'}
              visible={fetching}
            />
          </div>
        </div>
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
    renderImages(repos) {
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