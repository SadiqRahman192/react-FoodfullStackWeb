import React from "react";
import img1 from '../../public/foodimg1.png'
import img2 from '../../public/foodimg2.png'
import img3 from '../../public/foodimg3.png'
import img4 from '../../public/foodimg4.png'

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works For Foodies!</h2>
      <p>
        You can order your favorite food online from your favorite restaurant
        within a few moments:
      </p>
      <div className="steps-container">
        <div className="step">
          <img src={img1} alt="Search for food or restaurant" />
          <h3>Search for your favorite food or restaurant</h3>
          <p>Explore your favorite food and restaurant on openmenu.pk</p>
        </div>
        <div className="step">
          <img src={img2} alt="Add to cart & order online" />
          <h3>Add to cart & order online</h3>
          <p>
            Select your order and fill your cart from all your favorite
            restaurants and food items, available in one place.
          </p>
        </div>
        <div className="step">
          <img src={img3} alt="Get it delivered without hustle" />
          <h3>Get it delivered without any hustle</h3>
          <p>
            Receive your ordered food through on-time delivery, directly from
            your favorite restaurant.
          </p>
        </div>
        <div className="step">
          <img src={img4} alt="Enjoy food & leave a review" />
          <h3>Enjoy food & leave a review</h3>
          <p>
            Enjoy your meal and share your feedback about your experience with
            the food delivery and quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
