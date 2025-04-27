// export default function Footer() {
//   return (
//     <div>
//       <div className="yellow"></div>
//       <p className="center">
//         © 2004-2025 TastyHub. All Rights Reserved. | Crafted with Love for Food
//         Lovers Everywhere .
//       </p>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-scroll";
// import yellowArrow from '../assets/yellowArrow.png'
// import { FaHome } from 'react-icons/fa'; 
import { FaArrowUp } from "react-icons/fa"; // Import the arrow-up icon


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="center">Get Your Meal! On Your Door Step</h2>
        <p className="footer-text">
          © 2004-2025 TastyHub. All Rights Reserved. | Craf ted with Love for
          Food
        </p>
      </div>
      <div className="footer-arrow">
        <Link to="home-section" smooth={true} duration={500} className="home">
        <FaArrowUp  className="animated-icon"/> 
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
