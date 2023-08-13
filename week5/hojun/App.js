import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Navigator from './Navigator';
import Weathers from './Weathers'
import TodoLists from './TodoLists'
import Movies from './Movies';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigator />} />
        <Route path='/Weathers' element={<Weathers />} />
        <Route path='/TodoLists' element={<TodoLists />} />
        <Route path='/Movies' element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;