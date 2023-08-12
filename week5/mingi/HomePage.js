import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="container">
      <div className="menu">
        <h1>Home Page</h1>
        <ul>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
          <li>
            <Link to="/todo">Todo List</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
