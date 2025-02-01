import { UserLogin } from "../interfaces/UserLoginInterface";

//bring in env variable for api url using vite specific import.meta
const apiUrl = import.meta.env.VITE_API_BASE_URL || '';


const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();
    if(!response.ok) {
      throw new Error(data.message || 'Failed to log in');
    }

    return data;
  } catch(err) {
    console.log('Error from user login: ', err);
    throw err;
  }
}



export { login };