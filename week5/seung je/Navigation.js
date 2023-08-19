import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
        <p>Week5</p>
        <Link to="/todos">투두 리스트</Link><br/>
        <Link to="/news">뉴스</Link><br/>
        <Link to="/weather">날씨</Link><br/>
        <Link to="/movie">영화</Link><br/>
    </div>
  );
};

export default Navigation;
