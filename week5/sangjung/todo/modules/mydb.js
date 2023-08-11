import axios from "axios";

const myDB = axios.create({
    baseURL: process.env.REACT_APP_DBURL,
    timeout: 1000,
    headers: {
        'Content-type': 'application/json', 
        'Accept': 'application/json' 
    },
})

const send = async (axiosFunc, params = {}, body={}, url = "/react/todo")=>{
    const response = await axiosFunc(url, { 
        ...body, 
        params:{...params}
    });
    if (response.data.status !== "completed") {
        throw response.data.data;
    }
    return response.data.data;
}

const mydb = {
    get : () => send(myDB.get),
    set : (id,body) => send(myDB.post, {}, {id, ...body}),
    patch : (id,body) => send(myDB.patch, {}, {id, ...body}),
    _delete : (id) => send(myDB.delete, {id})
}

export default mydb;