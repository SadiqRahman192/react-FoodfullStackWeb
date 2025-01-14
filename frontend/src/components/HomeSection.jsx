import React from "react";
import { Link } from "react-scroll";
// import Icon from '../../public/ss.png'
// import "./HomeSection.css"; // Import the CSS file
// import { FaArrowDown } from "react-icons/fa"; // Import the arrow-up icon

const HomeSection = () => {
  return (
    <>
      <section className="home-section">
        <div className="content-container">
          <h1 className="main-heading">Satisfy Your Cravings, Anytime!</h1>
          <p className="sub-text">
            "Fresh burgers, cheesy pizzas, delivered hot and bursting with
            flavor!"
          </p>
          <Link
            to="meals-section"
            smooth={true}
            duration={1000}
            className="MainSecBtn "
          >
            Order Now!
          </Link>
        </div>
            {/* <img src={Icon} className="logosize" alt="downArrow" /> */}
      </section>
    </>
  );
};

export default HomeSection;
