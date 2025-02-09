
import { FilterFormInterface } from "../interfaces/FilterFormInterface";

interface HandleApplyInterface {
    formData: FilterFormInterface;
    setQueryString: (queryString: string) => void;
}
//function for creating query string for downloads search filters and sorting parameters
export   const buildDownloadsQueryString = ({formData, setQueryString}: HandleApplyInterface): void => {
    //validate form data
    //create query string
    const params = new URLSearchParams();
    if (formData.searchBy && formData.searchQuery){
      params.append(formData.searchBy, formData.searchQuery);
    }
    const sortMapping: Record<string, { sort_by: string; sort_dir: 'ASC' | 'DESC' }> = {
      date_asc: { sort_by: 'date', sort_dir: 'ASC' },
      date_desc: { sort_by: 'date', sort_dir: 'DESC' },
      module_asc: { sort_by: 'module', sort_dir: 'ASC' },
      module_desc: { sort_by: 'module', sort_dir: 'DESC' },
      package_asc: { sort_by: 'package', sort_dir: 'ASC' },
      package_desc: { sort_by: 'package', sort_dir: 'DESC' }
    };

    if (formData.sort in sortMapping) {
      const { sort_by, sort_dir } = sortMapping[formData.sort as keyof typeof sortMapping];
      params.append('sort_by', sort_by);
      params.append('sort_dir', sort_dir);
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
  };