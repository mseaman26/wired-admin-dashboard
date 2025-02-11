import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../api/authAPI';
import { globalStyles } from '../globalStyles';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }
    
    try {
      await sendPasswordResetEmail(email);
      setMessage('A password reset link has been sent.');
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={globalStyles.pageContainer}>
      <header style={globalStyles.header}>
        <h1>Forgot Password</h1>
        <p>Enter your email to reset your password</p>
      </header>

      <div style={globalStyles.authMainContent}>
        <form onSubmit={handlePasswordReset} style={globalStyles.authForm}>
          <div style={globalStyles.authInputGroup}>
            <label htmlFor="email" style={globalStyles.authLabel}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={globalStyles.authInput}
              required
            />
          </div>

          {message && <p style={globalStyles.authSuccess}>{message}</p>}
          {errorMessage && <p style={globalStyles.authError}>{errorMessage}</p>}

          <button type="submit" style={globalStyles.submitButton}>Send Reset Link</button>
          <Link style={globalStyles.authRedirect} to="/login">Back to Login</Link>
        </form>
      </div>
    </div>
  );
};


export default ForgotPasswordPage;
