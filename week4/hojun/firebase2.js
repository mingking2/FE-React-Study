import axios from 'axios'
axios.defaults = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    withCredentials: true
};

const url = 'https://fir-rest-api-e2b43-default-rtdb.firebaseio.com/'

const get = (setTodos) => {
    axios.get(url + '.json')
        .then((result) => {
            const tmp = []
            Object.entries(result.data).map(i => tmp.push(i[1]));
            setTodos(tmp);
        })
        .catch(err => console.log(err))
}

const put = (todo, setTodos) => {
    axios.put(url + `/${todo.text}.json`, todo)
        .then(() => get(setTodos))
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const del = (todo) => {
    axios.delete(url + `/${todo.text}.json`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const patch = (todo) => {
    axios.patch(url + `/${todo.text}.json`, { "checked": todo.checked })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const firebase2 = {
    get: get,
    put: put,
    delete: del,
    patch: patch
};

export default firebase2;