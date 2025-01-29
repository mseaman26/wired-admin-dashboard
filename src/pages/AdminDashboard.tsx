import React, { useState } from 'react';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const organizations = ['Organization A', 'Organization B', 'Organization C'];
  const users = [
    'User 1',
    'User 2',
    'User 3',
    'User 4',
    'User 5',
  ]; // Placeholder user data

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrganization(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header/>

      <footer style={styles.footer}>
        <p>&copy; 2025 Wired International. All rights reserved.</p>
      </footer>
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

  mainContent: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#fff', // White background for the main content
    borderRadius: '8px', // Rounded corners for a softer feel
    maxWidth: '800px',
  },
  footer: {
    backgroundColor: '#508432', // Primary color for footer
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    marginTop: 'auto',
    borderTop: '3px solid #fff', // Added border for consistency
  },
};

export default AdminDashboard;
