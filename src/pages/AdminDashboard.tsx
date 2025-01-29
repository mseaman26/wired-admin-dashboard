import React, { useState } from 'react';

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
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent} >
        <div style={styles.selectOrganization}>
          <label htmlFor="organization" style={styles.label}>
            Select Organization:
          </label>
          <select
            id="organization"
            value={selectedOrganization}
            onChange={handleOrganizationChange}
            style={styles.dropdown}
          >
            <option value="">-- Select an Organization --</option>
            {organizations.map((org, index) => (
              <option key={index} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.searchArea}>
          <label htmlFor="search" style={styles.label}>
            Search Users:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.userList}>
          <h3>Users</h3>
          <ul style={styles.userListItems}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <li key={index} style={styles.userListItem}>
                  {user}
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Your Company. All rights reserved.</p>
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
  header: {
    backgroundColor: '#508432', // Primary color for header
    color: '#fff',
    padding: '20px',
    textAlign: 'center',

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
  selectOrganization: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  searchArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#508432', // Using primary color for labels
  },
  dropdown: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc', // Lighter border for inputs
    borderRadius: '4px',
    backgroundColor: '#f9f9f9', // Slightly lighter background for the dropdown
  },
  searchInput: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9', // Lighter background for input field
  },
  userList: {
    marginTop: '20px',
  },
  userListItems: {
    listStyleType: 'none',
    padding: 0,
  },
  userListItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '8px',
    color: '#333', // Text color for users
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
