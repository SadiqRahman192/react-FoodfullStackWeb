import { createContext, useState, useEffect } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
  showLogInForm: () => {},
  hideLogInForm: () => {},
  showSignUpForm: () => {},
  hideSignUpForm: () => {},
  showProdDetailsModal: () => {},
  hideProdDetailsModal: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  // function showCheckOut() {
  //   setUserProgress(""); // Reset to avoid modal conflicts
  //   setUserProgress("checkout");
  // }

  function showCheckOut() {
    setUserProgress(''); // Reset to close other modals
    setTimeout(() => setUserProgress('checkout'), 0); // Set in next tick
  }

  function hideCheckOut() {
    setUserProgress("");
  }

  function showLogInForm() {
    setUserProgress(''); // Reset to close other modals
    setTimeout(() => setUserProgress('logInForm'), 0); // Set in next tick
  }

  function hideLogInForm() {
    setUserProgress("");
  }

  function showSignupForm() {
    setUserProgress(''); // Reset to close other modals
    setTimeout(() => setUserProgress('signUpForm'), 0); // Set in next tick
  }

  function hideSignupForm() {
    setUserProgress("");
  }

  function showProdDetailsModal() {
    setUserProgress("productDetailsModal");
  }

  function hideProdDetailsModal() {
    setUserProgress("");
  }

  useEffect(() => {
    console.log("Progress updated to:", userProgress);
  }, [userProgress]);

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
    showLogInForm,
    hideLogInForm,
    showSignupForm,
    hideSignupForm,
    showProdDetailsModal,
    hideProdDetailsModal,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
