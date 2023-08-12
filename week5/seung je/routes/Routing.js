import { Routes, Route } from 'react-router-dom';
import Todo from '../compoent/Todo/Todo';
import News from '../compoent/News/News';
import Weather from '../compoent/Weather/Weather';
import Navigation from '../Navigation';
import Movie from '../compoent/Movie/Movie';

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/"   element={<Navigation/>} />
        <Route path="/todos"  element={<Todo/>} />
        <Route path="/news"  element={<News/>} />
        <Route path="/weather"  element={<Weather/>} />
        <Route path="/movie"  element={<Movie/>} />
      </Routes>
    </div>
  );
};

export default Routing;