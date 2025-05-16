import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import { validateEmail, getPasswordError } from "../utils/validation";
import "../index.css";
import Modal from "./Ui/Modal";

function LoginForm({ toggleForm = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    login,
    error: authError,
    loading,
  } = useAuth();
  const userProgressCtx = useContext(UserProgressContext);

  // function handleOpenLoginForm() {
  //   userProgressCtx.showLogInForm();
  //   console.log("loginFormFuncRan")
  // }

  function handleOpenSinUpForm() {
    userProgressCtx.showSignupForm();
    console.log("SignUpFormFuncRan")
  }
  function validateForm() {
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    const passwordErrorMsg = getPasswordError(password);
    if (passwordErrorMsg) {
      setPasswordError(passwordErrorMsg);
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const success = await login(email, password);
      if (success) userProgressCtx.hideLogInForm();
    } catch (err) {}
  }

  return (
    <Modal
      open={userProgressCtx.progress === "logInForm"}
      onClose={() => userProgressCtx.hideLogInForm()}
    >
      <h2 className="login-form-title">Login to Your Account</h2>
      {authError && <p className="error-message">{authError}</p>}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (!validateEmail(email))
              setEmailError("Please enter a valid email address");
            else setEmailError("");
          }}
          required
          className="form-input"
        />
        {emailError && <span className="error-text">{emailError}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordError(getPasswordError(password))}
            required
            className="form-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="toggle-password-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <span className="error-text">{passwordError}</span>}
      </div>
      <div className="form-options">
        <div className="remember-me">
          <input type="checkbox" id="remember" className="checkbox-input" />
          <label htmlFor="remember" className="checkbox-label">
            Remember me
          </label>
        </div>
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="toggle-link">
        Don't have an account?{" "}
        <button
          className="toggle-btn"
          onClick={handleOpenSinUpForm}
        >
          Sign Up
        </button>
      </p>
    </Modal>
  );
}

export default LoginForm;
