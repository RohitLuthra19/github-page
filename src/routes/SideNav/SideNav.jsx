import React from "react";
import { connect } from "react-redux";

import PeopleIcon from "../../assets/people-icon";
import StarIcon from "../../assets/star-icon";
import OrganizationIcon from "../../assets/organization-icon";
import LocationIcon from "../../assets/location-icon";
import EmailIcon from "../../assets/email-icon";
import "./SideNav.css";

import { getUserProfile } from "../../redux/user/reducer";

export class SideNav extends React.PureComponent {
  render() {
    const {
      fetching,
      profile: {
        name,
        login,
        avatar_url,
        bio,
        followers,
        following,
        company,
        location,
        email,
      },
    } = this.props;

    if (fetching) {
      return <>Loading...</>;
    } else
      return (
        <>
          <img
            className="user"
            alt="user profile"
            width="260"
            height="260"
            src={avatar_url}
          />

          <div className="profile-container">
            <h1 className="profile">
              <span className="fullname">{name}</span>
              <span className="username">{login}</span>
            </h1>

            {bio && <div className="description">{bio}</div>}
            <div className="btn-group">
              <button className="btn">Edit profile</button>
            </div>

            <div className="follower-following">
              <PeopleIcon /> <span className="label">{followers}</span>{" "}
              followers <span className="label middle"></span>{" "}
              <span className="label">{following}</span> following{" "}
              <span className="label middle"></span> <StarIcon />{" "}
              <span className="label">7</span>
            </div>

            <ul className="other-details">
              {company && (
                <li className="list-item">
                  <OrganizationIcon />
                  <span className="list-item-text">{company}</span>
                </li>
              )}
              {location && (
                <li className="list-item">
                  <LocationIcon />
                  <span className="list-item-text">{location}</span>
                </li>
              )}
              {email && (
                <li className="list-item">
                  <EmailIcon />
                  <span className="list-item-text">{email}</span>
                </li>
              )}
            </ul>
          </div>
        </>
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
    fetching: userToJS.user.fetching,
  };
}

// don't need mapDispatchToProps b/c we are using action creators
export default connect(mapStateToProps, {
  getUserProfile,
})(SideNav);
