import Button from "./Ui/Button";
import Modal from "./Ui/Modal.jsx";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext.jsx";
import { useContext, useEffect, useRef } from "react";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./Ui/Input";
import useHttp from "../hooks/useHttps.js";
import Error from "./Error.jsx";
import { useAuth } from "../store/AuthContext"; // Import useAuth

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function ControlForm() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { getUserData, requireAuth } = useAuth(); // Access AuthContext methods
  const formRef = useRef(); // Ref for the form to set default values

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/orders`, requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    const userData = getUserData();
    if (userData && formRef.current) {
      formRef.current.name.value = userData.name || "";
      formRef.current.email.value = userData.email || "";
    }
  }, [getUserData]);

  function handleCloseCart() {
    userProgressCtx.hideCheckOut();
  }

  function handleFinish() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      // Require authentication before submitting
      requireAuth();

      const fd = new FormData(event.target);
      const customerData = Object.fromEntries(fd.entries());

      sendRequest(
        JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        })
      );
    } catch (err) {
      alert(err.message); // Display error (e.g., "You must be logged in")
    }
  }

  let actions = (
    <>
      <Button type="button"  onClick={handleCloseCart}>
        Close
      </Button>
      <Button>Submit Order!</Button>
    </>
  );

  if (isSending) {
    actions = <span>Data is sending...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <div className="center">
          <h2>Success!</h2>
          <p>
            Your order has been placed successfully we get your order dispach
            soon with an eamil{" "}
          </p>
          <p>We will get back soon in Minutes</p>
          <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={() => userProgressCtx.hideCheckOut()}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Name" type="text" id="name" name="name" />
        <Input label="E-Mail Address" type="email" id="email" name="email" />
        <Input label="Street" type="text" id="street" name="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" name="postal-code" />
          <Input label="City" type="text" id="city" name="city" />
        </div>
        {error && (
          <Error
            title={"NOT FOUND Your Data!"}
            message={"An Error Occurred!"}
          />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default ControlForm;
