import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import UserProfile from "./Components/UserProfile";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div>
      {!isProfilePage && <Navbar setSidebar={setSidebar} />}
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route
          path="/profile/:channelId"
          element={<UserProfile sidebar={sidebar} />}
        />
      </Routes>
    </div>
  );
};

export default App;
