import { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          {
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzI1OTc2NDkzMWM3MzEzZGRmYjM0NDExNzg3MTcxOCIsInN1YiI6IjY0ZDc0Mzc2YjZjMjY0MTE1NzUzNzVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOVBeo5wpEI8eC5Kq9klyD5RtEi0_srLYTPqMNGbJIA',
            },
            params: {
              limit: 10, 
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>대기중...</div>;
  }
  if (!movies) {
    return null;
  }

  return (
    <div>
      <h2>영화 정보</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
