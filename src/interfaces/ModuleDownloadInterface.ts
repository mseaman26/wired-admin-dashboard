interface ModuleInterface {
    name: string;
}
interface PackageInterface {
    name: string;
}

export interface ModuleDownloadInterface {
    id: number;
    download_date: number; 
    latitude: string; 
    longitude: string; 
    module?: ModuleInterface, 
    package?: PackageInterface

}