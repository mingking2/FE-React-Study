import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import TodoPage from "./TodoPage";
import NewsPage from "./NewsPage";
import WeatherPage from "./WeatherPage";
import MoviePage from "./MoviePage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/:category?" element={<NewsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
