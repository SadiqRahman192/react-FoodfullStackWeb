import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // "cart" , "checkout"
    showCart: () => {},
    hideCart: () => {},
    showCheckOut: () => {},
    hideCheckOut: () => {},
    showLogInForm: () => {},
    hideLogInForm: () => {},
    showProdDetailsModal: () => {},
    hideProdDetailsModal: () => {}
})

export function UserProgressContextProvider({ children }) {
    //    useReducer();
   const [userProgress, setUserProgress] = useState();

   function showCart() {
    setUserProgress('cart');
   }

   function hideCart() {
    setUserProgress('');
   }

   function showCheckOut() {
    setUserProgress('checkout')
   }

   function hideCheckOut() {
    setUserProgress('')
   }

   function showLogInForm(){
    setUserProgress('LogInForm')
   }

   function hideLogInForm(){
    setUserProgress('')
   }

   function showProdDetailsModal() {
    setUserProgress('productDetailsModal ')
   }
    
   function hideProdDetailsModal() {
    setUserProgress('')
   }
   
   const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
    showLogInForm,
    hideLogInForm,
    showProdDetailsModal,
    hideProdDetailsModal
   }
   

    return(
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )
}

export default UserProgressContext;