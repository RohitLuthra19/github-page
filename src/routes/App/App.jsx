import React from "react";
import { useSelector } from "react-redux";

import "./App.css";
import SideNav from "../SideNav/SideNav";
import Main from "../Main/Main";
import Spinner from "../../components/Spinner/Spinner";

const App = () => {
  const user = useSelector(state => state.user);
  const { user: {fetching, error}} = user.toJS();

  if(error) 
    return "error in loading page"

  return (
    <>
      <div className="row">
        <SideNav />
        <div className="main">
          <Main />
        </div>
      </div>}
      <Spinner left={"60%"} top={"60%"} fontSize={"3em"} visible={fetching} />
    </>
  )
};

export default App;
