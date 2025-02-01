

import { DownloadInterface } from "../interfaces/DownloadInterface";
import Auth from "../utils/auth";


//fetch data from /downloads endpoint
export const fetchDownloads = async (): Promise<DownloadInterface[]> => {
    try {
        const response = await fetch(`/downloads`, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
                contentype: 'application/json'
            }
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || 'Failed to fetch downloads');
        }
        return data;
    } catch(err) {
        console.log('Error from getDownloads: ', err);
        throw err;
    }
}