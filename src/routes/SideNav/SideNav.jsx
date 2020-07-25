import React from "react";
import { connect } from "react-redux";

import "./SideNav.css";

import { getUserProfile } from "../../redux/user/reducer";

export class SideNav extends React.PureComponent {
  render() {
    const {
      profile: { name, login, avatar_url , bio},
    } = this.props;

    return (
      <div className="side">
        <img className="user" alt="" width="260" height="260" src={avatar_url}/>

        <h1 className="profile">
          <span className="fullname">{name}</span>
          <span className="username">{login}</span>
        </h1>

        <div>{bio}</div>
        <button className="btn">Follow</button>
      </div>
    );
  }

  componentDidMount() {
    this.props.getUserProfile();
  }
}

///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////
function mapStateToProps(state) {
  const { user } = state;
  const userToJS = user.toJS();

  return {
    profile: userToJS.user.profile,
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(mapStateToProps, {
  getUserProfile,
})(SideNav);
