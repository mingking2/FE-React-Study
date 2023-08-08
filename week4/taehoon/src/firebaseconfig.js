import axios from 'axios';

axios.defaults.baseURL =
  'https://react-rest-api-8783e-default-rtdb.firebaseio.com/';
axios.defaults = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,DELETE,PATCH',
  },
};
const requestAPI = async(method, url, body)=>{
  try{
  return await axios[method](url, body);
  }
  catch(err){
    console.log(err);
  }
}

const getData = async (setTodos) => {
  try {
    const Data = await requestAPI('get', '.json');
    const setData = [];
    if (Data.data) {
      Object.entries(Data.data).map((d) => setData.push(d[1]));
      setTodos(setData);
    }
  } catch (err) {
    console.log(err);
  }
};

const putData = async (Todos, setTodos) => {
  try {
    await requestAPI('put', `/${Todos.id}.json`, Todos);
    getData(setTodos);
  } catch (err) {
    console.log(err);
  }
};

const patchData = async (Todos) => {
  try {
    await requestAPI('patch', `/${Todos.id}.json`, { checked: Todos.checked });
  } catch (err) {
    alert(err);
  }
};

const delData = async (Todos) => {
  try {
    await requestAPI('delete', `/${Todos.id}.json`);
  } catch (err) {
    alert(err);
  }
};

export { getData, putData, patchData, delData };
