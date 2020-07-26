import React from "react";
import { connect } from "react-redux";


import PeopleIcon from '../../assets/people-icon';
import KebabHorizontalIcon from '../../assets/kebab-horizontal-icon'
import StarIcon from '../../assets/star-icon'
import OrganizationIcon from '../../assets/organization-icon'
import LocationIcon from '../../assets/location-icon'
import EmailIcon from '../../assets/email-icon'
import "./SideNav.css";

import { getUserProfile } from "../../redux/user/reducer";

export class SideNav extends React.PureComponent {
  render() {
    const {
      profile: { name, login, avatar_url , bio, followers, following, company, location, email},
    } = this.props;

    return (
      <div className="side">
        <img className="user" alt="" width="260" height="260" src={avatar_url}/>

        <h1 className="profile">
          <span className="fullname">{name}</span>
          <span className="username">{login}</span>
        </h1>

        {bio && <div>{bio}</div>}
        <div className="btn-group">
          <button className="btn">Follow</button>
          <button className="report-btn"><KebabHorizontalIcon /></button>
        </div>

        <div className="follower-following">
          <PeopleIcon /> <span className="label">{followers}</span> followers <span className="label middle"></span> <span className="label">{following}</span> following <span className="label middle"></span> <StarIcon /> <span className="label">7</span>
        </div>

        <ul className="other-details">
          {company && <li><OrganizationIcon/><span className="list-item">{company}</span></li>}
          {location && <li><LocationIcon/><span className="list-item">{location}</span></li>}
          {email && <li><EmailIcon/><span className="list-item">{email}</span></li>}
        </ul>

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
