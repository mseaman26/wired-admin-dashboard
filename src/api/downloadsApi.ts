

import { ModuleDownloadInterface } from "../interfaces/ModuleDownloadInterface";
import Auth from "../utils/auth";


//fetch data from /downloads endpoint
export const fetchDownloads = async (): Promise<ModuleDownloadInterface[]> => {
    try {
        const response = await fetch(`/api/downloads`, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        });
        //check if response is json, if not, throw a user-readable error
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json") || response.status >= 500) {
            throw new Error("Failed to fetch downloads");
        }
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || 'Failed to fetch downloads');
        }
        console.log('data from getDownloads: ', data);
        return data;
    } catch(err) {
        console.error('Error from getDownloads: ', err);
        throw err;
    }
}