import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builer-backend.firebaseio.com'
})


export default instance;