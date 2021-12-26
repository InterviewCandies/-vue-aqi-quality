import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://api.airvisual.com/v2',
    params: {
        key: 'd3b94af9-b0b3-4be9-808b-9c027e3c102a',
    },
});

export default instance;