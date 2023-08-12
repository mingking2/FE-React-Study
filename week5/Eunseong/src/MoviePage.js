import { useEffect, useState } from "react";
import MovieList from "./MovieComp/MovieList";
import { getMovieList } from "./APIs/MovieAPI";

const MoviePage = () => {

  const [movieList, setMovieList] = useState([])


  useEffect(() => {
    getMovieList(setMovieList)
  }, [])

  return (
    <MovieList movieList={movieList}></MovieList>
  );
}

export default MoviePage;