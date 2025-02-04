interface ModuleInterface {
    name: string;
}
interface PackageInterface {
    name: string;
}

export interface ModuleDownloadInterface {
    id: number;
    download_date: number; 
    latitude: number; 
    longitude: number; 
    module?: ModuleInterface, 
    package?: PackageInterface

}