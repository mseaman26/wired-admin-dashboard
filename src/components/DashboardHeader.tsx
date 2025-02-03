import auth from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../globalStyles";


export default function DashboardHeader() {

    const { setIsAuthenticated } = useAuth();
    const handleLogout = () => {
        auth.logout();
        setIsAuthenticated(false);
    }


    return (
        <div style={styles.container}>
            <h1>Admin Dashboard</h1>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
    );
}


const styles: {[key: string]: React.CSSProperties} = {
  container: {
    backgroundColor: globalStyles.colors.headerColor, 
    color: globalStyles.colors.whiteTheme,
    padding: '20px',
    textAlign: 'center',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: globalStyles.colors.whiteTheme,
    color: globalStyles.colors.headerColor, 
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
}
