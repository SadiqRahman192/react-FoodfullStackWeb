import { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import UserProgressContext from '../store/UserProgressContext';
import { useContext } from 'react';
import { validateEmail, validateName, getPasswordError } from '../utils/validation';
import '../index.css';
import Modal from './Ui/Modal';

function SignupForm({ toggleForm = () => {} }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, loginWithGoogle, loginWithFacebook, error: authError, loading } = useAuth();
  const userProgressCtx = useContext(UserProgressContext);

  function validateForm() {
    let isValid = true;
    if (!validateName(name)) {
      setNameError('Name must be at least 2 characters and contain only letters');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    const passwordErrorMsg = getPasswordError(password);
    if (passwordErrorMsg) {
      setPasswordError(passwordErrorMsg);
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const success = await signup(name, email, password);
      if (success) userProgressCtx.hideSignupForm();
    } catch (err) {}
  }

  function handleOpenLoginForm() {
    userProgressCtx.showLogInForm();
    console.log("loginFormFuncRan")
  }

  // function handleOpenSinUpForm() {
  //   userProgressCtx.showSignupForm();
  //   console.log("SignUpFormFuncRan")
  // }

  return (
<Modal open={userProgressCtx.progress === "signUpForm"} onClose={() => userProgressCtx.hideSignupForm()}>
  <h2 className="signup-form-title">Create Your Account</h2>
      {authError && <p className="error-message">{authError}</p>}
      <div className="form-group">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (!validateName(name)) setNameError('Name must be at least 2 characters and contain only letters');
            else setNameError('');
          }}
          required
          className="form-input"
        />
        {nameError && <span className="error-text">{nameError}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (!validateEmail(email)) setEmailError('Please enter a valid email address');
            else setEmailError('');
          }}  
          required
          className="form-input"
        />
        {emailError && <span className="error-text">{emailError}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
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
      <button
        type="button"
        onClick={handleSubmit}
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
      <p className="toggle-link">
        Already have an account?{' '}
        <button
        onClick={handleOpenLoginForm}
          className="toggle-btn"
          disabled={!toggleForm}
        >
          Login
        </button>
      </p>
    </Modal>
  );
}

export default SignupForm;