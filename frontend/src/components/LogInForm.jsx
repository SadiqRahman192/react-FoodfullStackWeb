import React, { useContext } from "react";
import Modal from "./Ui/Modal";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./Ui/Button";

const LoginForm = () => {
  const UserProgressCtx = useContext(UserProgressContext);

  function handleCloseCart() {
    UserProgressCtx.hideLogInForm();
  }

  function handleLogin(event) {
    event.preventDefault();
    // Display login success message
    if (window.alert("Login successfully")) {
      // This block won't execute since `alert` doesn't return a value,
      // but we will call `handleCloseCart` after the alert in the next line.
    }
    handleCloseCart();
  }

  return (
    <Modal
      className="LogInForm"
      open={UserProgressCtx.progress === "LogInForm"}
    >
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">
              Username or email address <span className="required">*</span>
            </label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <a href="/forgot-password" className="forgot-password">
          Lost your password?
        </a>

        <p>Use a social account for faster login or easy registration.</p>
        <div className="social-login-buttons">
          <button className="social-button facebook">
            Log in with Facebook
          </button>
          <button className="social-button google">Log in with Google</button>
        </div>
        <Button onClick={handleCloseCart}>Close</Button>
      </div>
    </Modal>
  );
};

export default LoginForm;
