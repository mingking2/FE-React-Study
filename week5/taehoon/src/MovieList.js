import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Navbar } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState(null);
  const getMovies = async () => {
    const movieData = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating',
    );
    setMovies(movieData.data.data.movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container mt-3">
      <Navbar bg="primary" variant="dark" className="justify-content-center mb-3">
        <Navbar.Brand>Movie List</Navbar.Brand>
      </Navbar>
      {movies ? (
        <div className="card-deck">
          {movies.map((movie) => (
            <Card key={movie.id} className="mb-3" style={{ minWidth: '18rem' }}>
              <Card.Img
                variant="top"
                src={movie.medium_cover_image}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>
                  {movie.title} ({movie.year})
                </Card.Title>
                <Card.Text>평점: {movie.rating}</Card.Text>
                <Card.Text>런타임: {movie.runtime}</Card.Text>
                <Card.Text>장르: {movie.genres.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>loading movies.....</p>
      )}
    </div>
  );
};

export default MovieList;
