import { Route, Routes } from 'react-router-dom';
import NewsPage from '../news/pages/NewsPage';
import WeatherPage from '../weather/pages/WeatherPage';
import TodoPage from '../todo/pages/TodoPage';
import Page from '../component/Page';

const Pages = () => {

    return (
        <>
            <Page/>
            <Routes>
                <Route path="/weather" element={<WeatherPage/>} />
                <Route path="/todo" element={<TodoPage/>} />
                <Route path="/news/:category?" element={<NewsPage/>} />
                <Route path="/" element={<></>} />
            </Routes>
        </>
    )
}

export default Pages;