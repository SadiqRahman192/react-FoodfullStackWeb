import React, { useContext } from "react";
import Modal from "./Ui/Modal";
import Button from "./Ui/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";


const ProductDetailsModal = ({ meal, onClose }) => {
  const userProgressCtx = useContext(UserProgressContext);

  if (!meal) return null;

  console.log(meal.image);

  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  function handleCloseProdDetailsModal() {
    userProgressCtx.hideProdDetailsModal()
  }

  return (
    <Modal className="productDetailsModal" open={true} onClose={() => userProgressCtx.hideProdDetailsModal()}>
      <div>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.name}
          className="modal-image"
        />
        <h2>{meal.name}</h2>
        <p>{meal.description}</p>
        <p>Price: ${meal.price}</p>
      </div>
      <Button onClick={handleAddMealToCart}>Add to Cart</Button>

      <Button textOnly onClick={onClose}>Close</Button>
    </Modal>
  );
};

export default ProductDetailsModal;
