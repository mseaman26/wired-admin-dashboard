import { useState, useEffect } from 'react';
import { globalStyles } from '../globalStyles';

interface FilterPopoverProps {
  setQueryString: (queryString: string) => void,
  onClose: () => void,
}

interface FilterFormInterface {
  searchBy: string;
  searchQuery: string;
  sort: string;
  startDate: string;
  endDate: string;
}

const FilterPopover = ({ setQueryString, onClose }: FilterPopoverProps) => 
  {

  const [formData, setFormData] = useState<FilterFormInterface>({
    searchQuery: '',
    searchBy: '',
    sort: '',
    startDate: '',
    endDate: '',
  });

  const handleApply = (): void => {
    const params = new URLSearchParams();
    if (formData.searchBy && formData.searchQuery){
      params.append(formData.searchBy, formData.searchQuery);
    }
    if (formData.sort){
      if(formData.sort === 'date_asc'){
        params.append('sort_by', 'date');
        params.append('sort_dir', 'ASC');
      }
      if(formData.sort === 'date_desc'){
        params.append('sort_by', 'date');
        params.append('sort_dir', 'DESC');
      }
    }
    if (formData.startDate) params.append('start_date', formData.startDate);
    if (formData.endDate) params.append('end_date', formData.endDate);
    if (formData.searchBy){
      if(formData.searchBy === 'module'){
        params.append('module_name', formData.searchQuery);
      }else if(formData.searchBy === 'package'){
        params.append('package_name', formData.searchQuery);
      }
    }

    setQueryString(params.toString());
    onClose(); // Close the popover after applying the filters
  };

  //TODO: Remove this useEffect
  useEffect(() => {
    console.log('formData', formData);
  }, [formData]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popover} onClick={(e) => e.stopPropagation()}>
        <h4 style={styles.title}>Filter & Sort</h4>

        <label style={styles.label}>Search By: </label>
        
        <select
          value={formData.searchBy}
          onChange={(e) => setFormData({ ...formData, searchBy: e.target.value })}
          style={styles.dropdown}
        >
          <option value="">Select Category</option>
          <option value="module">Module Name</option>
          <option value="package">Package Name</option>
        </select>
        
        <input 
          disabled={!formData.searchBy}
          type="text" 
          value={formData.searchQuery} 
          onChange={(e) => setFormData({ ...formData, searchQuery: e.target.value })} 
          style={styles.input}
        />

        <label style={styles.label}>Start Date</label>
        <input 
          type="date" 
          value={formData.startDate} 
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
          style={styles.input}
        />

        <label style={styles.label}>End Date</label>
        <input 
          type="date" 
          value={formData.endDate} 
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} 
          style={styles.input}
        />
        <label style={styles.label}>Sort By</label>
        
        <select value={formData.sort} onChange={(e) => setFormData({...formData, sort: e.target.value})} style={styles.input}>
          <option value="">None</option>
          <option value="date_asc">Date (oldest first)</option>
          <option value="date_desc">Date (most recent first)</option>
        </select>

        <div style={styles.buttonContainer}>
          <button style={styles.applyButton} onClick={handleApply}>Apply</button>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popover: {
    backgroundColor: globalStyles.colors.pageBackgroundMain,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    minWidth: '300px',
    maxWidth: '500px',
    textAlign: 'center',
    zIndex: 1001, // Ensure popover appears above the overlay
  },
  title: {
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: 'bold',
    color: globalStyles.colors.darkText,
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: globalStyles.colors.darkText,
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    border: `1px solid ${globalStyles.colors.darkText}`,
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',

  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  applyButton: {
    backgroundColor: globalStyles.colors.darkButtonTheme,
    color: globalStyles.colors.whiteTheme,
    fontSize: '14px',
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '45%', // Allow for space between the buttons
  },
  cancelButton: {
    backgroundColor: globalStyles.colors.error,
    color: globalStyles.colors.whiteTheme,
    fontSize: '14px',
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '45%', // Allow for space between the buttons
  },
};

export default FilterPopover;
