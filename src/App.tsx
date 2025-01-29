
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import './App.css'
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('is authenticated at app', isAuthenticated);
  }, [isAuthenticated]);

  console.log(apiUrl);

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
