import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import "./Home.css";

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  useEffect(() => {
    console.log(`Категорията се смени на: ${category}`);
  }, [category]);

  return (
    <div className="home">
      <Sidebar
        setCategory={setCategory}
        sidebar={sidebar}
        category={category}
      />

      <div
        className={`container ${sidebar ? "sidebar-open" : "large-container"}`}
      >
        <Feed category={category} />
      </div>
    </div>
  );
};

Home.propTypes = {
  sidebar: PropTypes.bool.isRequired,
};

export default Home;
