import config from '../config';
import TokenService from './token-service';

const UserService = {
    getUserInfo(){
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if(!res.ok) {
            return res.json().then(error => Promise.reject(error))
            }
            return res.json();
        })
    }
}

export default UserService;