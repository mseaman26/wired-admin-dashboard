interface ModuleInterface {
    name: string;
}
interface PackageInterface {
    name: string;
}

export interface DownloadInterface {
    id: number;
    download_date: string; 
    latitude: number; 
    longitude: number; 
    module?: ModuleInterface, 
    package?: PackageInterface

}