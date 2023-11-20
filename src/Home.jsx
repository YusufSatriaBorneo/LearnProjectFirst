import { getMovieList, searchMovie } from "./Api";
import { useEffect, useState } from "react";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-tittle">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
              movie.poster_path
            }`}
          />
          <div className="Movie-date">Rilis : {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Satria Movie Search Engine</h1>
        <input
          placeholder="Cari Filem Apa ?"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default Home;
