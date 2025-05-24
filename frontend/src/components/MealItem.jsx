import { currencyFormatter } from "../util/formatting.js";
import Button from "./Ui/Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal, onShowDetails }) { // onShowDetails
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }


  return (
    <li className="meal-item">
      <article>
        <img
          src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${meal.image}`}
          alt={meal.name}
          onClick={() => onShowDetails(meal)} // Trigger details fetch on image click
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          {/* <p>{meal.description}</p> */}
          <p className="meal-item-actions">
            {/* <Button onClick={handleAddMealToCart}>Add to Cart</Button> */}
            <Button onClick={() => onShowDetails(meal)}>View Details</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
