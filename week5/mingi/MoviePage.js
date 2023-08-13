import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviePage.scss';

const MoviePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=rating`)
      .then(response => setMovies(response.data.data.movies))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Link to="/">홈으로 이동</Link>
      <h1>MoviePage</h1>
      <ul className="movieList">
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <div className="movieTitle">{movie.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviePage;
