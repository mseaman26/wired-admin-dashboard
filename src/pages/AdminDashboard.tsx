
import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DownloadTable from '../components/DownloadTable';
import { fetchDownloads } from '../api/downloadsApi';
import { DownloadInterface } from '../interfaces/DownloadInterface';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { globalStyles } from '../globalStyles';

const AdminDashboard = () => {

  const [downloads, setDownloads] = useState<DownloadInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasQueriedDownloads, setHasQueriedDownloads] = useState<boolean>(false);

  const handleViewAllDownloads = async () => {
    setHasQueriedDownloads(true);
    setLoading(true);
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
    }finally{
      setLoading(false);
    }
  }


  return (
    <div style={styles.container}>
      <DashboardHeader/>
      <button style={styles.button} onClick={handleViewAllDownloads}>View All Downloads</button>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      {loading  ?  
        <LoadingSpinner />
        :
        hasQueriedDownloads ?
          downloads.length > 0 ?
            <DownloadTable data={downloads} />
            :
            <div style={styles.error}>No downloads found.</div>
          :<></>
        }
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
    alignItems: 'center',

  },
  button: {
    backgroundColor: globalStyles.colors.darkButtonTheme, 
    color: globalStyles.colors.whiteTheme,
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
    backgroundColor: globalStyles.colors.error,
    color: globalStyles.colors.whiteTheme,
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
