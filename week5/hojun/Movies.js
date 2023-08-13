import React, { useEffect, useState } from 'react';

import axios from "axios";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    const showMovie = (title, overview, average, id, poster_path) => {
        const src = process.env.REACT_APP_POSTER_PATH + poster_path
        return (
            <div key={id}>
                <h3>{title}</h3>
                <label>overview : {overview}</label> <br />
                <label>average : {average}</label> <br />
                <img src={src} alt='none' width={200} height={300} /> <hr />
            </div>
        )
    }

    useEffect(() => {
        const getMovies = async () => {
            axios.defaults = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                withCredentials: true
            }

            const result = await axios({
                url: process.env.REACT_APP_MOVIE,
                method: 'get',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + process.env.REACT_APP_AUTHORIZATION,
                },
                params: {
                    api_key: process.env.REACT_APP_MOVIE_KEY,
                    language: 'en-US',
                    page: 1
                }
            })
            console.log(result.data.results);
            setMovies(result.data.results.sort((a, b) => {
                return b.vote_average - a.vote_average;
            }));

            console.log(process.env.REACT_APP_POSTER_PATH)
        }

        getMovies()
    }, [])

    return <div>{movies.map(m => showMovie(m.title, m.overview, m.vote_average, m.id, m.poster_path))}</div>;
};

export default Movies