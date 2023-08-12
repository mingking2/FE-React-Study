import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import TodoPage from "./TodoPage";
import NewsPage from "./NewsPage";
import WeatherPage from "./WeatherPage";

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/:category?" element={<NewsPage />} />
      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  </div>
  );
};

export default App;
