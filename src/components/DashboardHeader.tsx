import auth from "../utils/auth";
import { useAuth } from "../context/AuthContext";



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
    backgroundColor: '#508432', // greenish
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: "#fff",
    color: "#508432", 
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
}
