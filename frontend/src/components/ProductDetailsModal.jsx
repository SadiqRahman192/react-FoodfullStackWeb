import React, { useContext } from "react";
//  import UserProgressContext from "../store/UserProgressContext";
import Modal from "./Ui/Modal";
import Button from "./Ui/Button";
import CartContext from "../store/CartContext";
// import Button from "./Ui/Button";

const ProductDetailsModal = ({ meal, onClose }) => {
  if (!meal) return null;

  console.log(meal.image);

  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  //  function handleOpenCartClick() {
  //   UserprogressCtx.showCart();
  // }

  // function handleOpenProdDetailsModal() {
  //   UserprogressCtx.showProdDetailsModal();
  // }

  // function handleCloseProdDetailsModal() {
  //   UserprogressCtx.hideProdDetailsModal();
  // }

  return (
    <Modal className="productDetailsModal" open={true}>
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
