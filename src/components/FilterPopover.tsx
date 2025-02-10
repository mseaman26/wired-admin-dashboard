import { useState, useEffect } from 'react';
import { globalStyles } from '../globalStyles';
import { FilterFormInterface } from '../interfaces/FilterFormInterface';
import LocationInputs from './LocationInputs';
import { buildDownloadsQueryString } from '../utils/helperFunctions';

interface FilterPopoverProps {
  setQueryString: (queryString: string) => void,
  onClose: (formData?: FilterFormInterface) => void,
}

const FilterPopover = ({ setQueryString, onClose }: FilterPopoverProps) => 
  {

  const [formData, setFormData] = useState<FilterFormInterface>({
    searchQuery: '',
    searchBy: '',
    sort: '',
    startDate: null,
    endDate: null,
    latitude: '',
    longitude: '',
    distance: '',
  });

  const [locationInputShown, setLocationInputsShown] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [latitudeError, setLatitudeError] = useState<string>('');
  const [longitudeError, setLongitudeError] = useState<string>('');
  const [distanceError, setDistanceError] = useState<string>('');

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      setFormData(parsedFormData);
      if(parsedFormData.latitude || parsedFormData.longitude || parsedFormData.distance){
        setLocationInputsShown(true);
      }

    }
  }, []);

  const handleApply = (): void => {
    //validate form data
    localStorage.setItem('formData', JSON.stringify(formData));
    if (formData.searchBy && !formData.searchQuery) {
      setError('Please enter a search query');
      return;
    }
    if (locationInputShown && !formData.latitude) {
      setError('Please enter a latitude');
      return;
    }
    if (locationInputShown && !formData.longitude) {
      setError('Please enter a longitude');
      return;
    }
    if (formData.latitude && formData.longitude && (latitudeError || longitudeError)) {
      setError('Please enter valid coordinates');
      return;
    }
    if (locationInputShown && !formData.distance) {
      setError('Please enter a distance');
      return;
    }
    buildDownloadsQueryString({formData, setQueryString});
    onClose(); // Close the popover after applying the filters
  };


  const clearAll = (): void => {
    setFormData({
      searchQuery: '',
      searchBy: '',
      sort: '',
      startDate: null,
      endDate: null,
      latitude: '',
      longitude: '',
      distance: '',
    });
    setLocationInputsShown(false)
    setError('');
    setLatitudeError('');
    setLongitudeError('');
    setDistanceError('');
    localStorage.removeItem('formData');
  }

  //I add comments like this because i have an extension that highlights certain comments so they can be easily found in the scrollbar
  //RETURN:
  return (
    <div style={styles.overlay} onClick={() =>onClose(formData)}>
      <div style={styles.popover} onClick={(e) => e.stopPropagation()}>
        <h4 style={styles.title}>Filter & Sort</h4>

        <label style={globalStyles.label}>Search By: </label>
        
        <select
          value={formData.searchBy}
          onChange={(e) => setFormData({ ...formData, searchBy: e.target.value })}
          style={styles.dropdown}
        >
          <option value="">Select Category</option>
          <option value="module">Module Name</option>
          <option value="package">Package Name</option>
        </select>
        <button style={styles.clearAllButton} onClick={clearAll}>Clear All</button>
        
        <input 
          disabled={!formData.searchBy}
          type="text" 
          value={formData.searchQuery} 
          placeholder={formData.searchBy ? `Enter ${formData.searchBy} name` : 'Select a category first'}
          onChange={(e) => setFormData({ ...formData, searchQuery: e.target.value })} 
          style={globalStyles.input}
        />

        <label style={globalStyles.label}>Start Date</label>
        <input 
          type="date" 
          value={formData.startDate ? new Date(formData.startDate * 1000).toISOString().split('T')[0] : ''} 
          onChange={(e) => setFormData({ 
            ...formData, 
            //convert date to unix timestamp
            startDate: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : null
          })} 
          style={globalStyles.input}
        />

        <label style={globalStyles.label}>End Date</label>
        <input 
          type="date" 
          //convert unix timestamp to date
          value={formData.endDate ? new Date(formData.endDate * 1000).toISOString().split('T')[0] : ''} 
          onChange={(e) => setFormData({ 
            ...formData, 
            endDate: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : null
          })} 
          style={globalStyles.input}
        />

                {/* Latitude & Longitude Inputs (Only show when checkbox is checked) */}
        <LocationInputs 
          loactionInputsShown={locationInputShown} 
          setLocationInputsShown={setLocationInputsShown} 
          formData={formData} setFormData={setFormData} 
          latitudeError={latitudeError} 
          setLatitudeError={setLatitudeError}
          longitudeError={longitudeError} 
          setLongitudeError={setLongitudeError}
          distanceError={distanceError}
          setDistanceError={setDistanceError}
          />
        
        <label style={globalStyles.label}>Sort By</label>
        <select 
          value={formData.sort} 
          onChange={(e) => setFormData({...formData, sort: e.target.value})} 
          style={{...globalStyles.input, backgroundColor: formData.sort ? globalStyles.colors.whiteTheme : globalStyles.colors.whiteOverlay}}
        >
          <option value="">None</option>
          <option value="date_asc">Date (oldest first)</option>
          <option value="date_desc">Date (most recent first)</option>
          <option value="module_asc">Module Name (A-Z)</option>
          <option value="package_asc">Package Name (A-Z)</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.buttonContainer}>
          <button style={styles.applyButton} onClick={handleApply}>Apply</button>
          <button style={styles.cancelButton} onClick={() => onClose(formData)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
//STYLES:
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
    paddingInline: '60px',
    paddingBlock: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    minWidth: '300px',
    maxWidth: '500px',
    textAlign: 'center',
    zIndex: 1001, // Ensure popover appears above the overlay
    maxHeight: '80vh',
    overflow: 'auto',

  },
  title: {
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: 'bold',
    color: globalStyles.colors.darkText,
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
  error: {
    fontSize: '18px',
    color: globalStyles.colors.error,
    marginTop: '0px',
  },
  clearAllButton: {
    backgroundColor: globalStyles.colors.error, // Adjust color as needed
    color: globalStyles.colors.whiteTheme,
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
    margin: '10px',
  },
};

export default FilterPopover;
