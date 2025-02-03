import React, { useState } from 'react';
import { login as loginAPI } from '../api/authAPI';
import Auth from '../utils/auth';
import { UserLogin } from '../interfaces/UserLoginInterface';
import { useAuth } from '../context/AuthContext';
import { globalStyles } from '../globalStyles';

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState<UserLogin>({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated } = useAuth();



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
      const loginData = { ...userLogin };
      try {
        const response = await loginAPI(loginData);
        Auth.login(response.token);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof Error) {
          if(error.message === 'Failed to fetch') {
          setErrorMessage('there was a problem with the server. Please try again.');
          }
          else {
            setErrorMessage(error.message);
          }
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      }

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
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: globalStyles.colors.pageBackgroundMain,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: globalStyles.colors.darkText,
  },
  header: {
    backgroundColor: globalStyles.colors.headerColor,
    color: globalStyles.colors.whiteTheme,
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
    backgroundColor: globalStyles.colors.whiteTheme,
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
    color: globalStyles.colors.headerColor,
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: globalStyles.colors.lightGray,
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    color: globalStyles.colors.whiteTheme,
    backgroundColor: globalStyles.colors.headerColor,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: globalStyles.colors.error,
    fontSize: '14px',
  },
  footer: {
    backgroundColor: '#508432',
    color: globalStyles.colors.whiteTheme,
    padding: '10px',
    textAlign: 'center',
    marginTop: 'auto',
    borderTop: '3px solid #fff',
  },
};

export default LoginPage;
