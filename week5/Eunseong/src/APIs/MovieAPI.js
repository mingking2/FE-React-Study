import axios from "axios";

const movieInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/popular/`,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "ko-KR",
  }
})

export const getMovieList = async(setMovieList) => {
  await movieInstance.get()
    .then(res => setMovieList(res.data.results))
    .catch(e => console.log(e))
}