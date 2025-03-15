import "./Sidebar.css";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jackie from "../../assets/jackie.png";
import casey from "../../assets/casey.png";
import charly from "../../assets/charly.png";
import margot from "../../assets/margot.png";
import PropTypes from "prop-types";

const Sidebar = ({ sidebar, category, setCategory }) => {
  const handleCategoryChange = (newCategory) => {
    console.log(`Избрана категория: ${newCategory}`);
    setCategory(newCategory);
  };

  return (
    <div
      className={`sidebar ${sidebar ? "show" : "hidden"} ${
        sidebar ? "expanded" : ""
      }`}
    >
      <div className="shortcut-links">
        <div
          onClick={() => handleCategoryChange(0)}
          className={`side-link ${category === 0 ? "active" : ""}`}
        >
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div
          onClick={() => handleCategoryChange(20)}
          className={`side-link ${category === 20 ? "active" : ""}`}
        >
          <img src={game_icon} alt="" />
          <p>Gaming</p>
        </div>
        <div
          onClick={() => handleCategoryChange(2)}
          className={`side-link ${category === 2 ? "active" : ""}`}
        >
          <img src={automobiles} alt="" />
          <p>Automobiles</p>
        </div>
        <div
          onClick={() => handleCategoryChange(17)}
          className={`side-link ${category === 17 ? "active" : ""}`}
        >
          <img src={sports} alt="" />
          <p>Sports</p>
        </div>
        <div
          onClick={() => handleCategoryChange(24)}
          className={`side-link ${category === 24 ? "active" : ""}`}
        >
          <img src={entertainment} alt="" />
          <p>Entertainment</p>
        </div>
        <div
          onClick={() => handleCategoryChange(28)}
          className={`side-link ${category === 28 ? "active" : ""}`}
        >
          <img src={tech} alt="" />
          <p>Technology</p>
        </div>
        <div
          onClick={() => handleCategoryChange(10)}
          className={`side-link ${category === 10 ? "active" : ""}`}
        >
          <img src={music} alt="" />
          <p>Music</p>
        </div>
        <div
          onClick={() => handleCategoryChange(22)}
          className={`side-link ${category === 22 ? "active" : ""}`}
        >
          <img src={blogs} alt="" />
          <p>Blogs</p>
        </div>
        <div
          onClick={() => handleCategoryChange(25)}
          className={`side-link ${category === 25 ? "active" : ""}`}
        >
          <img src={news} alt="" />
          <p>News</p>
        </div>
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>SUBSCRIBED</h3>
        <Link to="/profile/UCR0l-DhuoKVZKJXXccr-2FA" className="side-link">
          <img src={jackie} alt="" />
          <p>CS Jackie</p>
        </Link>
        <Link to="/profile/UCtinbF-Q-fVthA0qrFQTgXQ" className="side-link">
          <img src={casey} alt="" />
          <p>Casey Neistat</p>
        </Link>
        <Link to="/profile/UCX-hnCKSXdOmutbcSL_4pLQ" className="side-link">
          <img src={charly} alt="" />
          <p>Charly Wilde</p>
        </Link>
        <Link to="/profile/UCTJZ6YUsgcTV8A5makeXdtg" className="side-link">
          <img src={margot} alt="" />
          <p>Margot Lee</p>
        </Link>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  category: PropTypes.number.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default Sidebar;
