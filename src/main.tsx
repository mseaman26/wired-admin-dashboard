import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  { AuthProvider } from './context/AuthContext.tsx';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LoginRedirectWrapper from './components/LoginRedirectWrapper.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute redirectTo='/login'>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
            <LoginRedirectWrapper>
                <LoginPage />
            </LoginRedirectWrapper>
        ),
      },
    ],
  },
]);


const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
