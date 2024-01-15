import React from "react";
import Profile from "./common/ProfileTab";

const Home = ({user}) => {
  return <Profile user={user} name={"My Profile"} />;
};

export default Home;
