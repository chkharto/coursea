import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import Details from "../components/details/Details";

const DetailsPage = () => {
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
      <Details /> 
      <Footer />
      

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}

      {login && <Login setLogin={setLogin} setSignup={setSignup} />}
      {signup && <SignUp setLogin={setLogin} setSignup={setSignup} />}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default DetailsPage;
