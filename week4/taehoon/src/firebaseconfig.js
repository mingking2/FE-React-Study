import axios from 'axios';

axios.defaults.baseURL =
  'https://react-rest-api-8783e-default-rtdb.firebaseio.com/';
axios.defaults = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,DELETE,PATCH',
  }
};

const getData = async (setTodos) => {
  const Data = await axios.get('.json');
  try {
    if (Data.data) {
      const setData = [];
      Object.entries(Data.data).map((d) => setData.push(d[1]));
      setTodos(setData);
    }
  } catch (err) {
    console.log(err);
  }
};

const putData = async (Todos, setTodos) => {
  await axios.put(`/${Todos.id}.json`, Todos);
  try {
    getData(setTodos);
  } catch (err) {
    alert('put' + err);
  }
};

const patchData = async (Todos) => {
  try {
    await axios.patch(`/${Todos.id}.json`, { checked: Todos.checked });
  } catch (err) {
    alert(err);
  }
};

const delData = async (Todos) => {
  try {
    await axios.delete(`/${Todos.id}.json`);
  } catch (err) {
    alert(err);
  }
};

export { getData, putData, patchData, delData };
