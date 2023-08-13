import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoMain from './TodoMain';
import Navbar from './Navbar';
import MovieList from './MovieList';
import Weather from './Weather';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="/todos" element={<TodoMain/>}/>
        <Route path="/movies" element={<MovieList/>}/>
        <Route path="/weather" element={<Weather/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 