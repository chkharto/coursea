import React, { useState } from "react";
import BrowseCourses from "../components/browseCourses/BrowseCourses";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

const Courses = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      <Header
        setLogin={setLogin}
        setSignup={setSignup}
        setProfile={setProfile}
        setShowSidebar={setShowSidebar}
      />
      <BrowseCourses />
      <Footer />

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}

      {login && <Login setLogin={setLogin} setSignup={setSignup} />}
      {signup && <SignUp setLogin={setLogin} setSignup={setSignup} />}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default Courses;
