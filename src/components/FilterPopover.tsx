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
  latitude?: number | '' ;
  longitude?: number | '';
  distance?: number | '';
}

const FilterPopover = ({ setQueryString, onClose }: FilterPopoverProps) => 
  {

  const [formData, setFormData] = useState<FilterFormInterface>({
    searchQuery: '',
    searchBy: '',
    sort: '',
    startDate: '',
    endDate: '',
    latitude: '',
    longitude: '',
    distance: '',
  });

  const [loactionInputsShown, setLocationInputsShown] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [latitudeError, setLatitudeError] = useState<string>('');
  const [longitudeError, setLongitudeError] = useState<string>('');
  const [distanceError, setDistanceError] = useState<string>('');

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleApply = (): void => {
    //validate form data
    localStorage.setItem('formData', JSON.stringify(formData));
    if (formData.searchBy && !formData.searchQuery) {
      setError('Please enter a search query');
      return;
    }
    if (loactionInputsShown && !formData.latitude) {
      setError('Please enter a latitude');
      return;
    }
    if (loactionInputsShown && !formData.longitude) {
      setError('Please enter a longitude');
      return;
    }
    if (formData.latitude && formData.longitude && (latitudeError || longitudeError)) {
      setError('Please enter valid coordinates');
      return;
    }
    if (loactionInputsShown && !formData.distance) {
      setError('Please enter a distance');
      return;
    }
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
      //this if/else ensures that only one of the two searchBy options is used
      if(formData.searchBy === 'module'){
        params.append('module_name', formData.searchQuery);
      }else if(formData.searchBy === 'package'){
        params.append('package_name', formData.searchQuery);
      }
    }
    if (formData.latitude && formData.longitude){
      params.append('latitude', formData.latitude.toString());
      params.append('longitude', formData.longitude.toString());
      if(formData.distance){
        params.append('distance', formData.distance.toString());
      }
    }

    setQueryString(params.toString());
    onClose(); // Close the popover after applying the filters
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'latitude') {
      const latitude = parseFloat(e.target.value);
      if (latitude < -90 || latitude > 90) {
        setLatitudeError('Latitude must be between -90 and 90');
      } else {
        setLatitudeError('');
      }
      setFormData({ ...formData, latitude });
    } else if (e.target.name === 'longitude') {
      const longitude = parseFloat(e.target.value);
      if (longitude < -180 || longitude > 180) {
        setLongitudeError('Longitude must be between -180 and 180');
      } else {
        setLongitudeError('');
      }
      setFormData({ ...formData, longitude });
    }
    else if (e.target.name === 'distance') {
      const distance = parseFloat(e.target.value);
      if (distance < 0) {
        setDistanceError('Distance must be a positive number');
      } else {
        setDistanceError('');
      }
      setFormData({ ...formData, distance });
    }
  };

  const clearAll = (): void => {
    setFormData({
      searchQuery: '',
      searchBy: '',
      sort: '',
      startDate: '',
      endDate: '',
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
        <button style={styles.clearAllButton} onClick={clearAll}>Clear All</button>
        
        <input 
          disabled={!formData.searchBy}
          type="text" 
          value={formData.searchQuery} 
          placeholder={formData.searchBy ? `Enter ${formData.searchBy} name` : 'Select a category first'}
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

                {/* Latitude & Longitude Inputs (Only show when checkbox is checked) */}
                {loactionInputsShown && (
        <>
          <label style={styles.label}>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude?.toString()} 
            onChange={handleLocationChange}
            style={styles.input}
            placeholder="Enter latitude"
            min={-90}
            max={90}
            step={0.000001}
            />
          {latitudeError && <p style={styles.smallError}>{latitudeError}</p>}

          <label style={styles.label}>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude?.toString()}
            onChange={handleLocationChange}
            style={styles.input}
            placeholder="Enter longitude"
            min={-180}
            max={180}
            step={0.000001}
          />
          <label style={styles.label}>Distance (miles)</label>
          <input
            type="number"
            name="distance"
            value={formData.distance?.toString()}
            onChange={handleLocationChange}
            style={styles.input}
            placeholder="Enter distance in miles"
            min={0}
            step={0.1}
          />
          {distanceError && <p style={styles.smallError}>{distanceError}</p>}
        </>
        )}
        
        <label style={styles.label}>Sort By</label>
        <select 
          value={formData.sort} 
          onChange={(e) => setFormData({...formData, sort: e.target.value})} 
          style={{...styles.input, backgroundColor: formData.sort ? globalStyles.colors.whiteTheme : globalStyles.colors.whiteOverlay}}
        >
          <option value="">None</option>
          <option value="date_asc">Date (oldest first)</option>
          <option value="date_desc">Date (most recent first)</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}
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
  error: {
    fontSize: '18px',
    color: globalStyles.colors.error,
    marginTop: '0px',
  },
  smallError: {
    fontSize: '12px',
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
