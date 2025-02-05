
import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DownloadTable from '../components/DownloadTable';
import { fetchDownloads } from '../api/downloadsApi';
import { ModuleDownloadInterface } from '../interfaces/ModuleDownloadInterface';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { globalStyles } from '../globalStyles';
import FilterPopover from '../components/FilterPopover';

const AdminDashboard = () => {

  const [downloads, setDownloads] = useState<ModuleDownloadInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasQueriedDownloads, setHasQueriedDownloads] = useState<boolean>(false);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>('');

  const handleViewAllDownloads = async () => {
    setHasQueriedDownloads(true);
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await fetchDownloads(queryString);
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


  useEffect(() => {
    handleViewAllDownloads();
  }, [queryString]);

  return (
    <div style={styles.container}>
      <DashboardHeader/>

      {filterPopoverOpen && <FilterPopover setQueryString={setQueryString} onClose={() => setFilterPopoverOpen(false)}/>}

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleViewAllDownloads}>View All Downloads</button>
        <button 
          style={{ ...styles.button, ...styles.filterButton }} 
          onClick={() => setFilterPopoverOpen(!filterPopoverOpen)}
        >
          Filter/Sort
        </button>
      </div>

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
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Space between the buttons
    marginTop: '20px',
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
  filterButton: {
    backgroundColor: globalStyles.colors.headerColor, // Different color for Filter/Sort button
    borderRadius: '8px',
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
