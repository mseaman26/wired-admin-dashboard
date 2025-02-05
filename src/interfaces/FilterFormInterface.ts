export interface FilterFormInterface {
    searchBy: string;
    searchQuery: string;
    sort: string;
    startDate: string;
    endDate: string;
    latitude?: number | '' ;
    longitude?: number | '';
    distance?: number | '';
  }