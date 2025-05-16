import Main from "./components/Main.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Footer from "./components/Footer.jsx";
import HomeSection from "./components/HomeSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import ProductDetailsModal from "./components/ProductDetailsModal.jsx";
import Chatbot from "./components/Chatbot.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import ControlForm from "./components/ControlForm.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import "./index.css";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
// import { useContext } from "react";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Router>
              <div className="app">
                <Main />
                <HomeSection />
                <HowItWorks />
                <Routes>
                  <Route path="/meals" element={<Meals />} />
                  <Route path="/orders" element={<OrderHistory />} />
                </Routes>
                <ProductDetailsModal />
                <Footer />
                <Cart />
                <LoginForm />
                <SignupForm />
                <ControlForm />
                <Chatbot />
              </div>
            </Router>
          </CartContextProvider>
        </UserProgressContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
