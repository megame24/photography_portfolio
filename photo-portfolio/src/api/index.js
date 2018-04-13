import axios from 'axios';

export default {
    login: data => axios.post('/admin/login', data)
}