import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-scroll";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../store/AuthContext";

function Main() {
  const userProgressCtx = useContext(UserProgressContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useContext(CartContext);

  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0);

  function handleOpenCartClick() {
    userProgressCtx.showCart();
  }

  function handleOpenLoginForm() {
    userProgressCtx.showLogInForm();
    console.log("loginFormFuncRan")
  }

  function handleOpenSinUpForm() {
    userProgressCtx.showSignupForm();
    console.log("SignUpFormFuncRan")
  }

  function handleLogout() {
    logout();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>TastyHub</h1>
      </div>
      <nav className={isMenuOpen ? "open" : ""}>
        <a href="/meals">Menu</a>
        <a href="/orders">Order History</a>
        <ThemeToggle />
        {!isAuthenticated ? (
          <>
            <button onClick={handleOpenLoginForm} className="login-btn">
              LogIn
            </button>
            <button className="signup-btn" onClick={handleOpenSinUpForm}>
              SignUp Today
            </button>
          </>
        ) : (
          <>
            <span className="welcome-text">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
        <button onClick={handleOpenCartClick} className="cart-btn">
          <FaShoppingCart />
          <span>Cart ({totalCartItems})</span>
        </button>
      </nav>
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
    </header>
  );
}

export default Main;