import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Ui/Modal";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
import Button from "./Ui/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
   
  function handleOpenCheckOutForm() {
    userProgressCtx.showCheckOut();
  }

  const cartCtx = useContext(CartContext);
  

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  
  /// this modal has prop named open it automaticallly add if check for u through usrprogrescomponent
 //  onClose={handleCloseCart} bug cannot be fixed due cuz it removes the input componenet
  return (
    <>
      <Modal className="cart" open={userProgressCtx.progress === "cart"} > 
        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id} // NOTE :all item in such list should receieve a key
              name={item.name} // Shorter way {...item} to get rid off manully * name={item.name} quantity={item.quantity} price={item.price}*
              quantity={item.quantity}
              price={item.price}
              Ondecrease={() => cartCtx.addItem(item)}
              Onincrease={() => cartCtx.removeItem(item.id)}
            />
          ))}
        </ul>
        <p className="cart-total">
         {currencyFormatter.format(cartTotal)}
        </p>
        <p className="modal-actions">
          <Button onClick={handleCloseCart}>Close</Button>
          {cartCtx.items.length > 0 && (
            <Button  type="submit"  onClick={handleOpenCheckOutForm}>Go to CheckOut</Button>
          )}
        </p>
      </Modal>
    </>
  );
}
