import React from 'react';
import { DownloadInterface } from '../interfaces/DownloadInterface';

const DataTable = ({ data }: { data: DownloadInterface[] }) => {
  return (
    <div style={styles.tableContainer}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Latitude</th>
                    <th style={styles.th}>Longitude</th>
                    <th style={styles.th}>Module Name</th>
                    <th style={styles.th}>Package Name</th>
                </tr>
            </thead>
            <tbody>
            {data.map((download, index) => (
                <tr key={`download_${download.id}`} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.td}>{new Date(download.download_date).toLocaleDateString()}</td>
                    <td style={styles.td}>{download.latitude}</td>
                    <td style={styles.td}>{download.longitude}</td>
                    <td style={styles.td}>{download.module?.name}</td>
                    <td style={styles.td}>{download.package?.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: {
    marginTop: '20px',
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '90%',
    
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    backgroundColor: '#5a382d', // Dark brown header
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
  evenRow: {
    backgroundColor: '#f9f9f9', // Light gray for readability
  },
  oddRow: {
    backgroundColor: '#e0c6a8', // Matches your dashboard background
  },
};

export default DataTable;
