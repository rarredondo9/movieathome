import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";
import GenreFilter from "./GenreFilter.mjs";
import { qs } from './utils.mjs';

const services = new ExternalServices();
const movieList = new MovieList('movie', qs('#movie-list'), qs('#status'), services);

movieList.init();

const genreFilter = new GenreFilter(
    'movie',
    qs('#genre-select'),
    services,
    (genreId) => movieList.init(genreId)
);
genreFilter.init();