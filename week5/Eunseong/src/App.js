import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from "./TodoPage";
import MoviePage from "./MoviePage";
import WeatherPage from "./WeatherPage";
import HomePage from './HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/TodoPage' element={<TodoPage />} />
        <Route path='/MoviePage' element={<MoviePage />} />
        <Route path='/WeatherPage' element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
