import React from "react";
import { useSelector } from "react-redux";

import "./App.css";
import SideNav from "../SideNav/SideNav";
import Main from "../Main/Main";
import Spinner from "../../components/Spinner";

const App = () => {
  const user = useSelector(state => state.user);
  const { user: {fetching, error}} = user.toJS();

  if(error) 
    return "error in loading page"

  return (
    <>
      <section className="container">
        <aside className="side">
          <SideNav />
        </aside>
        <main className="main">
          <Main />
        </main>
      </section>
      <Spinner left={"50%"} top={"50%"} fontSize={"3em"} visible={fetching} />
    </>
  )
};

export default App;
