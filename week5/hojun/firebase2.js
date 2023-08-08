import axios from 'axios'

const instanceAxios = async (url, method, body) => {
    axios.defaults = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        withCredentials: true
    };

    return await axios({
        url: process.env.REACT_APP_FIREBASE + url,
        method: method,
        data: body
    })
}

export default instanceAxios;