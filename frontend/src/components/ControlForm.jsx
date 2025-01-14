import Button from "./Ui/Button";
import Modal from "./Ui/Modal";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./Ui/Input";
import useHttp from "../hooks/useHttps.js";
import Error from "./Error.jsx";

const requestConfig = {
  /// WE create ConfigRequest outside of the component Func To avoid INFINITE LOOP
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function ControlForm() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  // if (error) {
  //   return (
  //     <Error title={"NOT FOUND Your Data!"} message={"An Error Occured!"} />
  //   );
  // }

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

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

    const fd = new FormData(event.target); // New form Data is a method provided by the browser to get hold the user entered values in an object Note inorder to work this method correctly u must add name attribute to every input.
    //    fd.get('name')
    const customerData = Object.fromEntries(fd.entries()); // it will provide e.g {email:test@gmail.com}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    
    // fetch("http://localhost:3000/orders", { REPLACES THIS CODE WITH USING CUSTOM HOOK
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCart}>
        Close
      </Button>
      <Button>Submit Order!</Button>
    </>
  );

  if (isSending) {
    actions = <span>Data is sending...</span>;
  }

  if(data && !error ) {
    return<Modal  open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
      <div className='center'>
        <h2>Success!</h2>
        <p>Your order has been placed successfully we get your order dispach soon with an eamil </p>
        <p>We will get back soon in Minutes</p>
      <p className='modal-actions'>
      <Button onClick={handleFinish}>Okay</Button>
      </p>
      </div>
    </Modal>
  }
    
  
  return (
 
    <Modal  open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && (
          <Error title={"NOT FOUND Your Data!"} message={"An Error Occured!"} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
