export interface FilterFormInterface {
    searchBy: string;
    searchQuery: string;
    sort: string;
    startDate: number | null;
    endDate: number | null;
    latitude?: number | '' ;
    longitude?: number | '';
    distance?: number | '';
  }