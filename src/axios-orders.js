import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-c8b7a.firebaseio.com/'
});

export default instance;