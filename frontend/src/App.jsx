import Main from "./components/Main.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import ControlForm from "./components/ControlForm.jsx";
import Footer from "./components/Footer.jsx";
import HomeSection from "./components/HomeSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import LogInForm from "./components/LogInForm.jsx";
import ProductDetailsModal from "./components/ProductDetailsModal.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Main />
        <HomeSection />
        <HowItWorks />
        <Meals />
        <ProductDetailsModal/>
        <Footer />
        <LogInForm />
        <Cart />
        <ControlForm />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

//NOTE: By adding that componet named <Cart/> it mean its availalle to do its job

// NOTE: Now is the step to wrap CONTEXTPROVIDER around all the components that r intrested in it in this case the MAIN AND MEALS componenet
// This wrapping will alow us to access the main and meals and its child component to context and its properties
