import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Ui/Modal";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
import Button from "./Ui/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleOpenControlForm() {
    userProgressCtx.showCheckOut();
    console.log('HELLO THIS IS CONTOL FORM');
  }

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <>
      <Modal
        className="cart"
        open={userProgressCtx.progress === "cart"}
        onClose={() => userProgressCtx.hideCart()}
      >
        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              Onincrease={() => cartCtx.addItem(item)}
              Ondecrease={() => cartCtx.removeItem(item.id)}
            />
          ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
          <Button onClick={handleCloseCart}>Close</Button>
          {cartCtx.items.length > 0 && (
            <Button type="button" onClick={handleOpenControlForm}>
              Go to CheckOut
            </Button>
          )}
        </p>
      </Modal>
    </>
  );
}