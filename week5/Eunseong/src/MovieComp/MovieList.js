import Container from '@mui/material/Container';
import MovieCard from "./MovieCard";

const MovieList = ({movieList}) => {
  return (
    <Container maxWidth="sm" sx={{position: "relative"}}>
      {movieList.map(movie => <MovieCard movie={movie} key={movie.id}></MovieCard>)}
    </Container>
  );
}

export default MovieList;