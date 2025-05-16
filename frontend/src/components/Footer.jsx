import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import { FaArrowUp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";

const Footer = () => {
  const userProgressCtx = useContext(UserProgressContext);


  function handleOpenSinUpForm() {
    userProgressCtx.showSignupForm();
    console.log("SignUpFormFuncRan")
  }


  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section: Branding and Tagline */}
        <div className="footer-branding">
          <h2>TastyHub</h2>
          <p>Get Your Meal Delivered to Your Doorstep!</p>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="footer-nav">
          {/* Explore Column */}
          <div className="nav-column">
            <h3>Explore</h3>
            <ul>
              <li>
                <ScrollLink
                  to="home-section"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <NavLink
                  to="/meals"
                  className="nav-link"
                  activeClassName="active"
                >
                  Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className="nav-link"
                  activeClassName="active"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <ScrollLink
                  to="how-it-works"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                >
                  How It Works
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="nav-column">
            <h3>Connect</h3>
            <ul>
              <li>
                <button
                  onClick={() => userProgressCtx.showLogInForm()}
                  className="nav-link nav-button"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={handleOpenSinUpForm}
                  className="nav-link nav-button"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media, Copyright, and Back to Top */}
        <div className="footer-bottom">
          {/* Social Media Icons */}
          <div className="social-icons">
            <a
              href="https://web.facebook.com/foodpanda.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/foodpanda_pakistan/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/foodpandaPH?t=YNA8VGsjPYWOCRpQstri4Q&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Copyright */}
          <p className="copyright">
            © 2004-2025 TastyHub. All Rights Reserved. | Crafted with Love for Food Lovers.
          </p>

          {/* Back to Top Arrow */}
          <ScrollLink
            to="home-section"
            smooth={true}
            duration={500}
            className="back-to-top"
          >
            <FaArrowUp className="animated-icon" />
          </ScrollLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;