import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginAPI } from '../api/authAPI';

const LoginPage = () => {
  console.log('sdf',import.meta.env.VITE_API_BASE_URL);
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
    } else {
      // Add your login logic here
      console.log('Logging in with:', { email, password });
      const loginData = { email, password };
      try {
        const response = await loginAPI(loginData);
        console.log('Response from login:', response);
      } catch (error) {
        console.error('Error from login:', error);
        setErrorMessage('Failed to log in. Please check your credentials.');
      }
      // Reset error if successful
      setErrorMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Login</h1>
        <p>Log in to access the admin dashboard</p>
      </header>

      <div style={styles.mainContent}>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}

          <button type="submit" style={styles.submitButton}>Log In</button>
        </form>
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(224, 198, 168, 1)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#333',
  },
  header: {
    backgroundColor: '#508432',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#508432',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#508432',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#f00',
    fontSize: '14px',
  },
  footer: {
    backgroundColor: '#508432',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    marginTop: 'auto',
    borderTop: '3px solid #fff',
  },
};

export default LoginPage;
