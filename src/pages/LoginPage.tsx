import React, { useState, useEffect } from 'react';
import { login as loginAPI } from '../api/authAPI';
import Auth from '../utils/auth';
import { UserLogin } from '../interfaces/UserLoginInterface';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin);
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is already logged in
    if (!Auth.loggedIn()) {
      setIsAuthenticated(false);
    }else{
      setIsAuthenticated(true);
    }

  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      setErrorMessage('Please enter both email and password.');
    } else {
      // Add your login logic here
      console.log('Logging in with:', { ...userLogin });
      const loginData = { ...userLogin };
      try {
        const response = await loginAPI(loginData);
        console.log('Response from login:', response);
        Auth.login(response.token);
        setIsAuthenticated(true);
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
              value={userLogin.email}
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
              value={userLogin.password}
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
