import { useContext,useState, useRef } from "react";
import React from "react";
import { Link } from "react-scroll"; // Import the scroll component

import Button from "./Ui/Button.jsx";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Main() {
  const userProgressCtx = useContext(UserProgressContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { items } = useContext(CartContext);

  let totalCartItems = items.length;

  function handleOpenCartClick() {
    userProgressCtx.showCart();
  }

  function handleOpenLogIn() {
    userProgressCtx.showLogInForm();
    console.log("LogInForm Opened!");
  }

  const cartCtx = useContext(CartContext);

  totalCartItems = cartCtx.items.reduce((totalNumbersOfItems, item) => {
    return totalNumbersOfItems + item.quantity;
  }, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>TastyHub</h1>
        </div>
        <nav className={isMenuOpen ? "nav open" : "nav"}>
          <a href="/meals" className="meals">Menu</a>
          <a href="/orders" className="meals">Order History</a>
          <ThemeToggle/>
          <button className="logInBtn" onClick={handleOpenLogIn}>
            LogIn
          </button>
          <Button onClick={handleOpenCartClick}>
            <FaShoppingCart style={{ fontSize: "18px", color: "black" }} />
            <span style={{ marginLeft: "8px" }}>Cart</span> ({totalCartItems})
          </Button>
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
    </>
  );
}

// /* <ControlForm ref={controlForm}/> */ ln return onheader ln : 45
// /* <CartModal ref={modal} title="Your Cart" /> */  ln return onheader ln : 46
