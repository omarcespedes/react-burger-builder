import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: 'https://burger-builder-omarcspds.firebaseio.com/'
})

export default axiosIntance;