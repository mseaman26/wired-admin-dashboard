import { UserLogin } from "../interfaces/UserLoginInterface";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(userInfo)
    });
    if(response.status >= 500) {
      throw new Error('Unable to connect to server');
    }
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