
import DashboardHeader from '../components/DashboardHeader';

const AdminDashboard = () => {

  return (
    <div style={styles.container}>

      <DashboardHeader/>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(224, 198, 168, 1)', // Updated background color
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#333', // Set default text color to dark gray for readability
  },
};

export default AdminDashboard;
