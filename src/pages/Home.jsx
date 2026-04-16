import React, { useState } from "react";
import Header from "../components/header/Header";
import Hero from "./../components/hero/Hero";
import Footer from "./../components/Footer";
import StartLearning from "../components/startLearning/StartLearning";
import ContinueLearning from "../components/continueLearning/ContinueLearning";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Profile from "./../components/auth/Profile";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  const token = localStorage.getItem("token");

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

      <Hero />

      {token ? (
        <>
          <ContinueLearning setLogin={setLogin} />
          <StartLearning />
        </>
      ) : (
        <>
          <StartLearning />
          <ContinueLearning setLogin={setLogin} />
        </>
      )}

      <Footer />

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}

      {login && <Login setLogin={setLogin} setSignup={setSignup} />}
      {signup && <SignUp setLogin={setLogin} setSignup={setSignup} />}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default Home;
