
import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DownloadTable from '../components/DownloadTable';
import { fetchDownloads } from '../api/downloadsApi';
import { DownloadInterface } from '../interfaces/DownloadInterface';

const AdminDashboard = () => {

  const [downloads, setDownloads] = useState<DownloadInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleViewAllDownloads = async () => {
    setErrorMessage('');
    try {
      const data = await fetchDownloads();
      setDownloads(data);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    }
  }


  return (
    <div style={styles.container}>
      <DashboardHeader/>
      <button style={styles.button} onClick={handleViewAllDownloads}>View All Downloads</button>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      {downloads.length > 0 && <DownloadTable data={downloads} />}
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
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#5a382d', // Dark brown for contrast
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    marginTop: '20px',
    maxWidth: '200px',  // Ensures it doesn't get too wide
    width: '100%', // Allows it to shrink on smaller screens
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#D9534F', // Bootstrap danger red
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    maxWidth: '80%',
    width: '100%',
  },
};

export default AdminDashboard;
